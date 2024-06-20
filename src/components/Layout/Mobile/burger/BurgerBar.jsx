import React from "react";
import { useNavigate } from "react-router-dom";
import SettingIcon from "../../../../assets/icons/SettingIcon";
import SupportIcon from "../../../../assets/icons/SupportIcon";
import SignOutIcon from "../../../../assets/icons/SignoutIcon";

const BurgerBar = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName");
  const initials = fullName
    ?.split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");
  const profilePictureUrl = localStorage.getItem("profilePictureUrl");
  const isProfilePicture = profilePictureUrl !== "undefined";

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    isOpen && (
      <>
        <div
          className="fixed inset-0 z-30 flex justify-center items-center bg-gray-600 bg-opacity-50 transition-all"
          onClick={onClose}
        ></div>
        <div className="fixed top-0 left-0 w-2/3 h-full bg-white z-40 flex flex-col divide-y divide-gray-200 pt-16">
          <div
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => handleNavigation("/profile")}
          >
            {isProfilePicture ? (
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="w-14 h-14 rounded-full cursor-pointer"
              />
            ) : (
              <div className="w-14 h-14 bg-active text-white text-2xl rounded-full flex items-center justify-center select-none cursor-pointer">
                {initials}
              </div>
            )}
            <p className="font-poppins font-medium text-lg leading-6 py-3">
              {fullName}
            </p>
          </div>
          <div
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => handleNavigation("/settings")}
          >
            <SettingIcon />
            <p className="font-poppins font-light text-sm leading-6">Setting</p>
          </div>
          <div
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => handleNavigation("/support")}
          >
            <SupportIcon />
            <p className="font-poppins font-light text-sm leading-6">
              Support & Help
            </p>
          </div>
          <div
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            <SignOutIcon />
            <p className="font-poppins font-light text-sm leading-6">Log out</p>
          </div>
        </div>
      </>
    )
  );
};

export default BurgerBar;
