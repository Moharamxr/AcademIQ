import React from 'react'
import Teacher from "../../../../assets/connect-teatcher (1).png";

const ChildClassesCard = () => {
  return (
<div className="bg-gray-100 rounded-lg between px-3 ">
        <div className="flex gap-x-4 center">
          <img src={Teacher} alt="Teacher" className="w-10 h-10" />
          <div className="flex flex-col gap-0">
            <div className="font-poppins font-normal text-xs leading-6">
              <h4 className="font-semibold text-sm leading-9 font-poppins">
                Arabic
              </h4>
              Guy Hawkins
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <span
            className={`text-gray-500 text-[10px] rounded-lg   text-center `}
          >
            SUN
          </span>
          <span
            className={`text-white text-[10px] rounded-lg px-1 bg-active  text-center`}
          >
            MON
          </span>
          <span
            className={`text-white text-[10px] rounded-lg px-1 bg-active  text-center`}
          >
            TUE
          </span>
          <span
            className={`text-gray-500 text-[10px] rounded-lg px-1  text-center`}
          >
            WED
          </span>
          <span
            className={`text-white text-[10px] rounded-lg px-1 bg-active  text-center`}
          >
            THU
          </span>
          <span
            className={`text-gray-500 text-[10px] rounded-lg px-1  text-center`}
          >
            FRI
          </span>
          <span
            className={`text-white text-[10px] rounded-lg px-1 bg-active  text-center`}
          >
            SAT
          </span>
        </div>
        <div className="flex flex-col text-end">
          <time className="text-green-400 text-[11px] font-poppins ">1:00 pm</time> 
          <span className="text-[10px] font-poppins">Lab 1</span>
        </div>
      </div>  )
}

export default ChildClassesCard