import React, { useEffect } from "react";
import { useState } from "react";
import ChildProfile from "./ChildProfile.jsx";
import ChildAssignments from "./childAssignments/ChildAssignments.jsx";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable.jsx";
import ChildClasses from "./childClasses/ChildClasses.jsx";
import ChildExaminations from "./childExaminations/ChildExaminations.jsx";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../services/user.service.js";
const Child = () => {

  const { childID } = useParams();

  const [userData, setUserData] = useState({});
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");

  const getData = async () => {
    try {
      const data = await getUserById(childID);
      setUserData(data?.user);
      const firstName = data?.user?.name?.first;
      const lastName = data?.user?.name?.last;
      const initials =
        (firstName?.charAt(0).toUpperCase() || "") +
        (lastName?.charAt(0).toUpperCase() || "");
      setInitials(initials);
      setBgColor(data?.user?.profilePicture?.color);
    } catch (error) {
      console?.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, [childID]);


  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Profile", content: <ChildProfile child={userData} /> },
    { label: "Examinations", content: <ChildExaminations childId={childID} /> },
    { label: "Assignment", content: <ChildAssignments childId={childID} /> },
    { label: "Grades", content: <ChildClasses childId={childID}/> },
  ];
  return (
    <>
      <div className="w-full lg:w-8/12  ">
        <div className="bg-white p-2 rounded-xl w-full ">
          <div className="center flex-col  py-10 gap-2">
            <div
              className="w-40 h-40 text-white text-7xl rounded-full center mr-2 select-none"
              style={{ backgroundColor: bgColor }}
            >
              {initials}
            </div>
            <p className="font-poppins font-light text-xl text-active  leading-8">
              {userData?.name?.first} {userData?.name?.last}
            </p>
          </div>

          <div className=" sm:gap-x-2 w-full  center">
            {tabs?.map((tab, index) => (
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
            <div className="text-sm text-gray-900">
              {tabs[activeTab].content}
            </div>
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
