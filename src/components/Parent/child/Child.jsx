import React, { useEffect } from "react";
import { useState } from "react";
import ChildProfile from "./ChildProfile.jsx";
import ChildAssignments from "./childAssignments/ChildAssignments.jsx";
import TimeTable from "../../Layout/timeTables/TimeTable.jsx";
import ChildExaminations from "./childExaminations/ChildExaminations.jsx";
import { useParams } from "react-router-dom";
import ChildGrades from "./childGrades/ChildGrades.jsx";
import { Skeleton } from "@mui/material";
import { getUserById } from "../../../services/user.service.js";
const Child = () => {
  const { childID } = useParams();

  const [userData, setUserData] = useState({});
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [childID]);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Profile", content: <ChildProfile child={userData} /> },
    { label: "Examinations", content: <ChildExaminations /> },
    { label: "Grades", content: <ChildGrades /> },
    { label: "Assignment", content: <ChildAssignments /> },
  ];
  return (
    <>
      <div className="w-full lg:w-8/12 min-h-[40rem] bg-white p-2 rounded-xl ">
        <div className="center flex-col  py-10 gap-2">
          {loading ? <Skeleton variant="circular" width={150} height={150} /> : userData?.profilePicture?.url ? (
            <img
              src={userData?.profilePicture?.url}
              className="rounded-full w-40 h-40"
            />
          ) : (
            <div
              className="w-40 h-40 text-white text-7xl rounded-full center mr-2 select-none"
              style={{ backgroundColor: bgColor }}
            >
              {initials}
            </div>
          )}
          {loading ?<Skeleton variant="text" width={200} height={40} /> : <p className="font-poppins font-light text-xl text-active  leading-8">
            {userData?.name?.first} {userData?.name?.last}
          </p>}
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
          <div className="text-sm text-gray-900">{tabs[activeTab].content}</div>
        </div>
      </div>

      <aside className="w-full lg:w-4/12  hidden md:block">
        <TimeTable />
      </aside>
    </>
  );
};

export default Child;
