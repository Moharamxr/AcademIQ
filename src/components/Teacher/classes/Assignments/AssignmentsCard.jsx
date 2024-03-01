import React from "react";
import PostPic from "../../../../assets/Ellipse 136.png";
import ThreeDots from "../../../../assets/icons/ThreeDots";
import Pdf from "../../../../assets/vscode-icons_file-type-pdf2.png";
import AssignmentPic from "../../../../assets/icons/AssignmentPic";

const AssignmentsCard = () => {
  return (
    <div className="flex flex-col border-2 border-gray-200/70 rounded-xl w-full">
      <div className="between p-4">
        <div className="flex gap-2">
          <AssignmentPic />
          <p className="font-poppins">
            Assignment no 1 <br />
            <time className="text-gray-300 text-sm">Apr 12, 2024</time>
          </p>
        </div>
        <span className="pe-4">
          <ThreeDots />
        </span>
      </div>
      <p className="px-4 py-2">
        Deadline:{" "}
        <time className="font-poppins text-gray-400 text-sm  ">
          24, Apr 2024 (12:00 PM)
        </time>{" "}
      </p>
      <div className="flex items-center gap-1 px-3 py-2">
        <img src={Pdf} alt="" />
        <p>assignment 1 requirements</p>
      </div>
      <div className="py-4 px-5 between">
        <button className="font-poppins text-gray-400 text-sm cursor-pointer ">
          Add comment{" "}
        </button>
        <span className="font-poppins text-gray-400 text-sm  ">8 Comments</span>
      </div>
    </div>
  );
};

export default AssignmentsCard;
