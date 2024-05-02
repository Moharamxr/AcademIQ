import React from "react";
import Word from "../../../../assets/vscode-icons_file-type-word.png";
import Pdf from "../../../../assets/vscode-icons_file-type-pdf2.png";
import { Skeleton } from "@mui/material";
const CourseFiles = ({ materials, isLoading }) => {
  return (
    <div className="w-full divide-y-2 px-4 py-3">
      {materials?.length > 0
        ? !isLoading &&
          materials.map((file, index) => (
            <div className="flex gap-3 py-2">
              <img src={Pdf} alt="Pdf" />
              <p className="font-poppins">
                Chapter 1 , Lesson 5 <br />
                <span className="text-xs text-gray-400">
                  40 KB, Microsoft edge pdf document
                </span>
              </p>
            </div>
          ))
        : !isLoading && (
            <p className="text-center font-poppins">No files available</p>
          )}
      {isLoading && (
        <div className="flex gap-3 py-2">
          <Skeleton variant="rounded" width={40} height={40} />
          <Skeleton variant="text" width={300} height={40} />
        </div>
      )}
      
       {/*<div className="flex gap-3 py-2">
        <img src={Pdf} alt="Pdf" />
        <p className="font-poppins">
          Chapter 1 , Lesson 5 <br />
          <span className="text-xs text-gray-400">
            {" "}
            40 KB, Microsoft edge pdf document
          </span>
        </p>
      </div>
      <div className="flex gap-3 py-2">
        <img src={Word} alt="Pdf" />
        <p className="font-poppins">
          Chapter 1 , Lesson 5 <br />
          <span className="text-xs text-gray-400">
            {" "}
            40 KB, Microsoft word pdf document
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default CourseFiles;
