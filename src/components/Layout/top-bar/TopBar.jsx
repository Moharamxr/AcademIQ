import React from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import AvatarPic from "../../../assets/AvatarTop.png";
import NotificationIcon from "../../../assets/icons/NotificationIcon";
import { useNavigate } from "react-router-dom";
const TopBar = () => {
  const fullName = localStorage.getItem("fullName");
  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const initials = fullName
    ?.split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");
  const bgColor = localStorage.getItem("profilePicture");

  const navigate = useNavigate();

  const handleGotoProfile = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="grid grid-cols-12 mb-4 pt-0  w-full ">
      <div className="bg-white center col-span-8  h-14 p-3 px-4 rounded-xl ">
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
      <div className=" col-span-4  h-14  flex  justify-between ps-4 gap-5 xl:gap-x-3 lg:gap-x-1">
        {/* <img src={AvatarPic} alt="AvatarPic  " className="aspect-square" /> */}
        <div
          className="w-14 h-14 bg-active  text-white text-2xl rounded-full center select-none cursor-pointer"
          
          onClick={handleGotoProfile}
        >
          {initials}
        </div>
        <div
          className="bg-white xl:py-1 xl:px-2 w-7/12   lg:flex hidden  flex-col justify-center items-center rounded-xl cursor-pointer"
          onClick={handleGotoProfile}
        >
          <p className="font-poppins font-normal lg:text-sm text-xs leading-6 text-black ">
            {fullName}
          </p>
          <p className="font-poppins font-normal xl:text-[11px] text-[9px] leading-5 overflow-hidden text-gray-400">
            {userEmail}
          </p>
        </div>

        <div className="bg-white  p-5  between rounded-2xl   ">
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
