import React from "react";
import Announcements from "../../Parent/announcements/Announcements";
import StudentsIcon from "../../../assets/icons/StudentsIcon";
import TeachersIcon from "../../../assets/icons/TeachersIcon";
import AdminsIcon from "../../../assets/icons/AdminsIcon";
import ThreeDots from "../../../assets/icons/ThreeDots";
import CalenderIcon from "../../../assets/icons/CalenderIcon";

const Dashboard = () => {
    const table = [
        
    ]
  const renderAdminTable = () => {
    for (let index = 0; index < 30; index++) {
        table.push({
            subject:'English',
            teacher:'Ahmed Khaled',
        },);
       
    }
  };
  return (
    <main className="w-full hidden lg:block">
      <section className="grid grid-cols-12 gap-5">
        <div className="col-span-10">
          <Announcements />
        </div>
        <div className="col-span-2 bg-white rounded-xl h-[11.3rem] center flex-col gap-2">
          <div className="center gap-3 w-5/6 px-3 py-2 bg-green-600  rounded-lg">
            <StudentsIcon color={"#FFFFFF"} />
            <h4 className="text-white  font-medium font-poppins">
              2000 Students
            </h4>
          </div>
          <div className="center gap-3 w-5/6 px-3 py-2 bg-gray-400 rounded-lg">
            <TeachersIcon color={"#FFFFFF"} />
            <h4 className="text-white  font-medium font-poppins">
              300 Teachers
            </h4>
          </div>
          <div className="center gap-3 w-5/6 px-3 py-2 bg-active rounded-lg">
            <AdminsIcon color={"#FFFFFF"} />
            <h4 className="text-white  font-medium font-poppins">
              6 Admins
            </h4>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl p-5">
        <div className="between">
          <select name="" id="" className="p-2 bg-gray-100 w-1/6 rounded-lg outline-none">
            <option value="">Class 1</option>
          </select>
          <ThreeDots />
        </div>
        <div className="grid grid-cols-13 grid-rows-6 pt-5 gap-5">
          <div className=" col-span-1 center">
            <CalenderIcon />
          </div>
          <div className="row-start-2 row-span-1 col-span-1 bg-active-bg text-active center p-2 rounded-lg">
            Sunday
          </div>
          <div className="row-start-3 row-span-1 col-span-1 bg-active-bg text-active center rounded-lg">
            Sunday
          </div>
          <div className="row-start-4 row-span-1 col-span-1 bg-active-bg text-active center rounded-lg">
            Sunday
          </div>
          <div className="row-start-5 row-span-1 col-span-1 bg-active-bg text-active center rounded-lg">
            Sunday
          </div>
          <div className="row-start-6 row-span-1 col-span-1 bg-active-bg text-active center rounded-lg">
            Sunday
          </div>
          <div className=" col-span-2 bg-active-bg text-active text-center py-2 px-4 center rounded-lg">
            9:00 - 10:30
          </div>
          <div className=" col-span-2 bg-active-bg text-active text-center py-2 px-4 center rounded-lg">
            9:00 - 10:30
          </div>
          <div className=" col-span-2 bg-active-bg text-active text-center py-2 px-4 center rounded-lg">
            9:00 - 10:30
          </div>
          <div className=" col-span-2 bg-active-bg text-active text-center py-2 px-4 center rounded-lg">
            9:00 - 10:30
          </div>
          <div className=" col-span-2 bg-active-bg text-active text-center py-2 px-4 center rounded-lg">
            9:00 - 10:30
          </div>
          <div className=" col-span-2 bg-active-bg text-active text-center py-2 px-4 center rounded-lg">
            9:00 - 10:30
          </div>
          {renderAdminTable()}
          {table.map((t,index)=>(
            <div key={index} className=" col-span-2 bg-gray-100 text-gray-700 text-center py-2 px-4 center flex-col rounded-lg">
            <span>{t.subject}</span>
            <p className="text-gray-500">{t.teacher}</p>
          </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
