import React, { useEffect, useState } from "react";
import Announcements from "../../Parent/announcements/Announcements";
import StudentsIcon from "../../../assets/icons/StudentsIcon";
import TeachersIcon from "../../../assets/icons/TeachersIcon";
import AdminsIcon from "../../../assets/icons/AdminsIcon";
import ThreeDots from "../../../assets/icons/ThreeDots";
import CalenderIcon from "../../../assets/icons/CalenderIcon";
import CreateTimetablePeriod from "./CreateTimetablePeriod";
import { getClassTimetable } from "../../../services/timetable.service";
import { getGradeClasses } from "../../../services/gradClass.service";
import { getUsersCounts } from "../../../services/user.service";
import { Skeleton } from "@mui/material";

const Dashboard = () => {
  const [table, setTable] = useState([]);
  const [classId, setClassId] = useState("66283d3721ad54ce0d9246d3");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const periods = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "1:00 - 2:00",
  ];
  const [classesData, setClassesData] = useState([]);
  const [usersCount, setUsersCount] = useState({});
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [tableError, setTableError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    renderAdminTable();
  };
  const onOpen = () => setIsOpen(true);

  const handleClassChange = (e) => {
    setClassId(e.target.value);
  };
  const renderAdminTable = async () => {
    const newTable = Array(30).fill({ subject: "", teacher: "" });
    try {
      setIsTableLoading(true);
      const data = await getClassTimetable(classId);
      setIsTableLoading(false);
      setTableError(false);
      data.timetable.forEach((entry) => {
        const index = days.indexOf(entry.day) * 6 + entry.period - 1;
        const fullName = `${entry.teacher.name.first} ${entry.teacher.name.last}`;
        newTable[index] = {
          subject: entry.course.title,
          teacher: fullName,
        };
      });
      setTable(newTable);
    } catch (error) {
      console.error(error);
      setTableError(true);
      setIsTableLoading(false);
    }
  };

  const renderSkeleton = () => {
    console.log("renderSkeleton");
    return Array(30)
      .fill(0)
      .map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          height={90}
          className="col-span-2 h-96"
        />
      ));
  };

  const getClasses = async () => {
    try {
      const data = await getGradeClasses();
      setClassesData(data.gradeClasses);
    } catch (error) {
      console.error(error);
    }
  };
  const getUsersCount = async () => {
    try {
      const data = await getUsersCounts();
      setUsersCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    renderAdminTable();
    getClasses();
    getUsersCount();
  }, [classId]);

  const toggleDelete = () => {
    setDeleteToggle(!deleteToggle);
  };

  const handleDeletePeriod = async () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="w-full hidden lg:block">
      <section className="grid grid-cols-12 gap-5">
        <div className="col-span-10">
          <Announcements />
        </div>
        <div className="col-span-2 bg-white rounded-xl h-[11.3rem] center flex-col gap-2">
          <div className="center gap-3 w-5/6 px-3 py-2 bg-green-600  rounded-lg">
            <StudentsIcon color={"#FFFFFF"} />
            <h4 className="text-white  font-medium font-poppins">
              {usersCount?.student} Students
            </h4>
          </div>
          <div className="center gap-3 w-5/6 px-3 py-2 bg-gray-400 rounded-lg">
            <TeachersIcon color={"#FFFFFF"} />
            <h4 className="text-white  font-medium font-poppins">
              {usersCount?.teacher} Teachers
            </h4>
          </div>
          <div className="center gap-3 w-5/6 px-3 py-2 bg-active rounded-lg">
            <AdminsIcon color={"#FFFFFF"} />
            <h4 className="text-white  font-medium font-poppins">
              {usersCount?.admin} Admins
            </h4>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl p-5">
        <div className="between">
          <select
            name="gradClasses"
            id="gradClasses"
            className="p-2 bg-gray-100 w-1/6 rounded-lg outline-none"
            onChange={handleClassChange}
            value={classId}
          >
            {classesData.map((c) => (
              <option key={c._id} value={c._id}>
                Class {c.level} {c.letter}
              </option>
            ))}
          </select>

          <span onClick={toggleDelete}>
            <ThreeDots />
          </span>
        </div>
        <div className="grid grid-cols-13 grid-rows-6 pt-5 gap-5">
          <div
            className=" col-span-1 center hover:cursor-pointer"
            onClick={onOpen}
          >
            <CalenderIcon />
          </div>
          {days?.map((day, index) => (
            <div
              key={index}
              className={`row-start-${
                index + 2
              } row-span-1 col-span-1  text-active bg-active-bg text-[15px] center  rounded-lg`}
            >
              {day}
            </div>
          ))}
          {periods?.map((period, index) => (
            <div
              key={index}
              className=" col-span-2 bg-active-bg text-active text-center py-2 px-4 center rounded-lg"
            >
              {period}
            </div>
          ))}
          {!isTableLoading && !tableError
            ? table?.map((t, index) => (
                <div
                  key={index}
                  className="col-span-2 bg-gray-100 text-gray-700 text-center py-2 px-4 center flex-col rounded-lg overflow-hidden"
                >
                  <span>{t.subject}</span>
                  <p className="text-gray-500">{t.teacher}</p>
                </div>
              ))
            : renderSkeleton()}
        </div>
      </section>
      <CreateTimetablePeriod isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Dashboard;
