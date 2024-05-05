import { Margin } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonLeaderBoard = () => {
  return (
    <div className="between">
      <div className="flex items-center">
        <Skeleton variant="circular" width={30} height={30} />
        <div className="flex w-96 h-12 ms-4" >
          <Skeleton variant="circular" width={55} height={47}  />
          <div className="flex flex-col w-full ms-3">
            <Skeleton variant="text" width={150} height={20} />
            <div className="flex-grow md:w-full w-48 mt-3">
                <Skeleton variant="rounded" width={310} height={10} />
            </div>
            {/* <div className="flex gap-x-3">
            <p className="font-poppins font-light text-xs leading-6 text-gray-600">
              37 lessons
            </p>
            <p className="font-poppins font-light text-xs leading-6 text-gray-600">
              2 quizzes
            </p>
            <p className="font-poppins font-light text-xs leading-6 text-gray-600">
              4 assignments
            </p>
          </div> */}
          </div>
        </div>
      </div>
      <Skeleton variant="text" width={35} height={20} sx={{marginTop: 0}} />
    </div>
  );
};

export default SkeletonLeaderBoard;
