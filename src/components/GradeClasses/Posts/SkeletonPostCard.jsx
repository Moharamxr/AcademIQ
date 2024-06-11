import React from "react";
import { Skeleton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SkeletonPostCard = () => {
  return (
    <div className="flex flex-col border-2 divide-y-2 border-gray-200/70 rounded-xl lg:w-5/6 w-full">
      <div className="between p-4">
        <div className="flex gap-2">
          <Skeleton variant="circular" width={40} height={40} />

          <Skeleton variant="text" width={100} height={20} />
          <br />
        </div>
        
      </div>
      <span className="my-5 pt-6 ps-3">
        <Skeleton variant="text" width={300} height={25} />
      </span>

      <div className="py-4 px-5 between ">
        <FavoriteBorderIcon />
        <span className="font-poppins text-gray-400 text-sm  cursor-pointer ">
          0 Comments
        </span>
        <span className="font-poppins text-gray-400 text-sm cursor-pointer ">
          Add comment{" "}
        </span>
      </div>
    </div>
  );
};

export default SkeletonPostCard;
