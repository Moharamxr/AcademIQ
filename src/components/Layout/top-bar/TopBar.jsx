import React from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import AvatarPic from "../../../assets/AvatarTop.png";
import NotificationIcon from "../../../assets/icons/NotificationIcon";
const TopBar = () => {
  const fullName = localStorage.getItem("fullName");
  const userEmail = localStorage.getItem("email");
  return (
    <div className="flex justify-between mb-4 pt-0  w-full ">
      <div className="bg-white center w-[66%]  h-14 pb-2 p-3 px-4 rounded-xl ">
        <div className="w-full bg-gray-200 bg-opacity-30  center p-1 rounded-lg">
          <div className=" w-6 h-6 center rounded-md hover:shadow-gray-300 hover:bg-gray-200 hover:shadow-sm">
            <SearchIcon />
          </div>
          <div className="w-full">
            <input
              type="text"
              name="topSearch"
              id="topSearch"
              placeholder="Search number , customer name..."
              className="bg-transparent w-full h-6 rounded-lg text-center font-dubai font-normal text-sm leading-6 text-gray-500 outline-none"
            />
          </div>
        </div>
      </div>
      <div className=" w-4/12  h-14 flex  justify-end">
        <div className="flex gap-x-1 pe-6">
          <img src={AvatarPic} alt="AvatarPic" className="aspect-square mx-2" />
          <div className="bg-white xl:py-3 xl:px-4 md:py-1 md:px-1  lg:flex hidden  flex-col justify-center items-center rounded-xl">
            <p className="font-poppins font-normal lg:text-sm text-xs leading-6 text-black ">
              {fullName}
            </p>
            <p className="font-poppins font-normal xl:text-[11px] text-[9px] leading-5 text-gray-400">
              {userEmail}
            </p>
          </div>
        </div>
        <div className="lg:bg-white lg:p-4 between rounded-2xl md:bg-transparent me-4 ms-2">
          <span className="relative inline-block ">
            <NotificationIcon />
            {/* <span className="absolute bottom-3 left-2 inline-flex items-center justify-center h-4 w-[fit-content] p-1 bg-red-500 text-white text-[10px] font-bold rounded-full">
              44
            </span> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
