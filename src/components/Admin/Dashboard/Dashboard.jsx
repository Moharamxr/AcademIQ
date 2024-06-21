import React, { useEffect, useState } from "react";
import Announcements from "../../Layout/announcements/Announcements";
import StudentsIcon from "../../../assets/icons/StudentsIcon";
import TeachersIcon from "../../../assets/icons/TeachersIcon";
import AdminsIcon from "../../../assets/icons/AdminsIcon";
import ThreeDots from "../../../assets/icons/ThreeDots";
import CalenderIcon from "../../../assets/icons/CalenderIcon";
import CreateTimetablePeriod from "./CreateTimetablePeriod";
import {
  deleteTimetablePeriod,
  getClassTimetable,
} from "../../../services/timetable.service";
import { getGradeClasses } from "../../../services/gradClass.service";
import { getUsersCounts } from "../../../services/user.service";
import { Skeleton } from "@mui/material";

const Dashboard = () => {
  const [table, setTable] = useState([]);
  const [classId, setClassId] = useState("");
  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
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
  const [dropMenu, setDropMenu] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    renderAdminTable();
  };
  const onOpen = () => setIsOpen(true);

  const handleClassChange = (e) => {
    setClassId(e.target.value);
  };
  const renderAdminTable = async () => {
    const newTable = Array(30).fill({ subject: "", teacher: "", id: "" });

    try {
      setIsTableLoading(true);
      if (classId === "") return;
      const data = await getClassTimetable(classId);
      setIsTableLoading(false);
      setTableError(false);
      data.timetable.forEach((entry) => {
        const index = days.indexOf(entry.day) * 6 + entry.period - 1;
        const fullName = `${entry.teacher.name.first} ${entry.teacher.name.last}`;
        newTable[index] = {
          subject: entry.course.title,
          teacher: fullName,
          id: entry._id,
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
      setClassId(data.gradeClasses[0]?._id);
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
    getClasses();
    getUsersCount();
  }, []);

  useEffect(() => {
    renderAdminTable();
  }, [classId]);

  const toggleDelete = () => {
    if (deleteToggle) setDropMenu(false);
    setDeleteToggle(!deleteToggle);
  };

  const toggleDropMenu = () => {
    setDropMenu(!dropMenu);
    setDeleteToggle(false);
  };

  const handleDeletePeriod = async (periodId) => {
    if (!deleteToggle) return;
    if (periodId === "") return;

    const isConfirm = window.confirm(
      "Are you sure you want to delete this period?"
    );
    if (!isConfirm) return;
    try {
      await deleteTimetablePeriod(classId, periodId);
      alert("Period deleted successfully");
      renderAdminTable();
    } catch (error) {
      console.error(error);
      alert("Failed to delete period");
    }
  };

  return (
    <div className="w-full ">
      <section className="grid grid-cols-12 gap-5">
        <div className="col-span-10 pb-4">
          <Announcements />
        </div>
        <div className="col-span-2 bg-white rounded-xl h-[11.3rem] overflow-hidden center flex-col gap-2">
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
            <option value="">Select Class</option>
            {classesData.map((c) => (
              <option key={c._id} value={c._id}>
                Class {c.level} {c.letter}
              </option>
            ))}
            {classesData.length === 0 && <option>no classes found</option>}
          </select>

          <div className="flex center gap-3 px-3 ">
            {dropMenu && (
              <div
                className={`${
                  !deleteToggle ? "bg-white" : "bg-red-400"
                }  shadow-lg rounded-lg z-10`}
              >
                <p
                  onClick={toggleDelete}
                  className="hover:bg-red-300 p-2 rounded-lg cursor-pointer"
                >
                  {deleteToggle ? "Disable" : "Enable"} Delete Period
                </p>
              </div>
            )}

            <span onClick={toggleDropMenu} className="py-3">
              <ThreeDots />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-13 grid-rows-6 pt-5 gap-2">
          <div
            className=" col-span-1 center hover:cursor-pointer"
            onClick={onOpen}
          >
            <CalenderIcon />
          </div>

          <div className="row-start-2 row-span-1 col-span-1 bg-active-bg text-active center text-[15px] rounded-lg">
            Saturday
          </div>
          <div className="row-start-3 row-span-1 col-span-1 bg-active-bg text-active center text-[15px]  rounded-lg">
            Sunday
          </div>
          <div className="row-start-4 row-span-1 col-span-1 bg-active-bg text-active center text-[15px] rounded-lg">
            Monday
          </div>
          <div className="row-start-5 row-span-1 col-span-1 bg-active-bg text-active center text-[15px] rounded-lg">
            Tuesday
          </div>
          <div className="row-start-6 row-span-1 col-span-1 bg-active-bg text-active center text-[13px] rounded-lg">
            Wednesday
          </div>
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
                  className={`col-span-2 min-h-24 bg-gray-100 text-gray-700 text-center py-2 px-4 center flex-col rounded-lg overflow-hidden ${
                    deleteToggle &&
                    "hover:cursor-pointer hover:bg-red-400 hover:text-white"
                  }`}
                  onClick={() => handleDeletePeriod(t.id)}
                >
                  <span>{t.subject}</span>
                  <p className="text-gray-500">{t.teacher}</p>
                </div>
              ))
            : renderSkeleton()}
        </div>
      </section>
      <CreateTimetablePeriod
        isOpen={isOpen}
        onClose={onClose}
        classId={classId}
      />
    </div>
  );
};

export default Dashboard;
