import React, { useEffect, useState } from "react";
import TimeTable from "../../Layout/timeTables/TimeTable";
import Laptop from "../../../assets/laptop white screen.png";
import Cap from "../../../assets/black graduation cap.png";
import Book from "../../../assets/red opened book.png";
import { getTeacherCounts } from "../../../services/user.service";

const Teacher = () => {
  const fullName = localStorage.getItem("fullName");
  const [counts, setCounts] = useState({
    coursesCount: 0,
    studentsCount: 0,
    department: "department",
  });

  const fetchCounts = async () => {
    try {
      const data = await getTeacherCounts();
      if (data?.teacherHomeData) {
        setCounts(data.teacherHomeData);
      }
    } catch (error) {
      console.error("Error fetching teacher counts: ", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="flex gap-4 w-full">
      <div className="w-full lg:w-8/12">
        <div className="flex flex-col gap-4 pt-1 w-full">
          <div className="bg-white rounded-xl p-4">
            <h2 className="font-poppins font-bold text-2xl leading-10 text-gray-800">
              Hello, {fullName}
            </h2>
            <p className="font-poppins font-normal text-base leading-tight text-gray-400">
              Welcome to our school, <br />
              Start creating highly engaging <br /> courses now!
            </p>
          </div>
          <div className="bg-white rounded-xl flex justify-between gap-2 p-2 w-full">
            <div className="border-active-br border-[1px] rounded-lg flex flex-col items-center text-center p-3 md:py-4 py-5 w-1/3 min-h-full">
              <img src={Laptop} alt="Laptop icon" />
              <div className="font-poppins py-2">
                <p className="text-active text-2xl">{counts.coursesCount}</p>
                Total Courses
              </div>
            </div>
            <div className="border-active-br border-[1px] rounded-lg flex flex-col items-center text-center p-3 py-6 w-1/3 min-h-full">
              <img src={Cap} alt="Graduation cap icon" />
              <div className="font-poppins py-2">
                <p className="text-active text-2xl">{counts.studentsCount}</p>
                Total Students
              </div>
            </div>
            <div className="border-active-br border-[1px] rounded-lg flex flex-col items-center text-center p-3 lg:py-1 xl:py-3 py-1 w-1/3 min-h-full">
              <img src={Book} alt="Book icon" />
              <div className="font-poppins py-2">
                <p className="text-active text-xl">
                  {counts.department.charAt(0).toUpperCase() +
                    counts.department.slice(1)}
                </p>
                Department
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="w-full lg:w-4/12 hidden md:block">
        <TimeTable />
      </aside>
    </div>
  );
};

export default Teacher;
