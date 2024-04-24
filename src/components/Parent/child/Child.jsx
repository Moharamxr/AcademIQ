import React from "react";
import childPhoto from "../../../assets/childPage.png";

import { useState } from "react";
import ChildProfile from "./ChildProfile.jsx";
import ChildAssignments from "./childAssignments/ChildAssignments.jsx";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable.jsx";
import ChildClasses from "./childClasses/ChildClasses.jsx";
import ChildExaminations from "./childExaminations/ChildExaminations.jsx";
const Child = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Profile", content: <ChildProfile /> },
    { label: "Classes", content: <ChildClasses/> },
    { label: "Assignment", content: <ChildAssignments /> },
    { label: "Examinations", content: <ChildExaminations/> },
  ];
  return (
    <>
      <div className="w-full lg:w-8/12  ">
        <div className="bg-white p-2 rounded-xl w-full ">
          <div className="center flex-col  py-10 gap-2">
            <img src={childPhoto} alt="child photo" className="rounded-full" />
            <p className="font-poppins font-light text-xl text-active  leading-8">
            Jane Cooper
            </p>
          </div>

          <div className=" sm:gap-x-2 w-full  center">
            {tabs.map((tab, index) => (
              <span
                key={index}
                className={`${
                  activeTab === index
                    ? "bg-active text-white"
                    : "bg-transparent text-gray-500 hover:bg-active-bg"
                } w-[93px] text-center p-1 rounded-lg focus:outline-none font-poppins text-sm font-medium cursor-pointer`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </span>
            ))}
          </div>

          <div className="w-11/12 mt-10 mx-auto">
            <div className="text-sm text-gray-900">{tabs[activeTab].content}</div>
          </div>
        </div>
      </div>
      <aside className="w-full lg:w-4/12  hidden md:block">
        <ParentTimeTable />
      </aside>
    </>
  );
};

export default Child;
