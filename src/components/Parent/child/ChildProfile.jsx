import React from "react";
import Pic from "../../../assets/FirstChild.png";
const ChildProfile = () => {
  return (
    <div className="flex flex-col gap-y-1 divide-y-2 divide-gray-100">
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Name:
        </p>
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Jane Cooper
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Age :
        </p>
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          17 years old
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Grad:
        </p>
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Binaries
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Specialization :
        </p>
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Scientific
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          family :
        </p>
        <div className="flex gap-3">
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 py-2 px-1 w-full">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400 min-w-20">
          Teachers :
        </p>
        <div className="flex gap-2 flex-wrap">
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          <div className="center gap-1">
            <img src={Pic} className="aspect-square sm:w-10 sm:h-10 w-8 h-8" alt="Pic" />
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Cooper Leslie
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ChildProfile;
