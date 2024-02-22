import React from "react";
import ProfilePic from "../../../../assets/tableChild (1).png";
import SettingIcon from "../../../../assets/icons/SettingIcon";
import SupportIcon from "../../../../assets/icons/SupportIcon";
import SignOutIcon from "../../../../assets/icons/SignoutIcon";
const BurgerBar = ({ onClose, isOpen }) => {
  return (
    isOpen && (
      <>
        <div
          className="fixed inset-0 z-30 flex justify-center items-center bg-gray-600 bg-opacity-50 transition-all "
          onClick={onClose}
        ></div>
        <div className="fixed top-0 left-0 w-2/3 h-full bg-white z-40 flex flex-col divide-y-2 divide-gray-200/90 pt-16">
          <div className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100" >
            <img src={ProfilePic} alt="ProfilePic" className="w-10 h-10" />
            <p className="font-poppins font-medium text-lg leading-6 py-3">
              Cooper Leslie
            </p>
          </div>
          <div className="flex items-center gap-4 p-2 px-4 cursor-pointer hover:bg-gray-100">
            <SettingIcon active={true} />
            <p className="font-poppins font-extralight text-sm leading-6 py-3 ps-3">
              Setting
            </p>
          </div>
          <div className="flex items-center gap-4 p-2 px-4 cursor-pointer hover:bg-gray-100">
            <SupportIcon active={true}/>
            <p className="font-poppins font-extralight text-sm leading-6 py-3 ps-3">
              Support & Help
            </p>
          </div>
          <div className="flex items-center gap-4 p-2 px-4 cursor-pointer hover:bg-gray-100">
            <SignOutIcon />
            <p className="font-poppins font-extralight text-sm leading-6 py-3 ps-2">
              Log out
            </p>
          </div>
        </div>
      </>
    )
  );
};

export default BurgerBar;
