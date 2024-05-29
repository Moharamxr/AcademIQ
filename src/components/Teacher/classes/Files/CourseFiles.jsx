import React, { useState } from "react";
import Word from "../../../../assets/vscode-icons_file-type-word.png";
import Pdf from "../../../../assets/vscode-icons_file-type-pdf2.png";
import ImageIcon from "@mui/icons-material/Image";
import { Skeleton } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import AddPostIcon from "../../../../assets/icons/AddPostIcon";
import AddNewFile from "./AddNewFile";

const CourseFiles = ({ materials, isLoading, getCourseData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getCourseData();
  };
  const onOpen = () => setIsOpen(true);

  return (
    <div className="flex flex-col px-4">
      <div
        className="border-2 border-gray-200/70 hover:bg-gray-100 cursor-pointer select-none rounded-xl p-4 flex gap-4  px-6 w-full mb-3 "
        onClick={onOpen}
      >
        <AddPostIcon />
        

        <p className="font-poppins  text-gray-700 pt-1 text-lg leading-7">
          Add new file
        </p>
      </div>
      <div className="w-full divide-y-2 ">
        {materials?.length > 0
          ? !isLoading &&
            materials.map((file) => (
              <div className="between" key={file?._id}>
                <div className="flex gap-3 py-2">
                  {file?.type === "image/png" ? (
                    <img src={file?.url} className="w-12 h-12" alt="Image" />
                  ) : (
                    <img
                      src={file?.type === "application/pdf" ? Pdf : Word}
                      className="w-12 h-12"
                      alt={
                        file?.type === "application/pdf" ? "PDF" : "Document"
                      }
                    />
                  )}
                  <p className="font-poppins">
                    {file?.title} <br />
                    <span className="text-xs text-gray-400">
                      {file?.type === "image/png"
                        ? "Image File"
                        : file?.type === "application/pdf"
                        ? "PDF Document"
                        : "Document File"}
                    </span>
                  </p>
                </div>
                <a href={file?.url} download={file?.name} target="_self">
                  <DownloadForOfflineIcon
                    color="action"
                    fontSize="large"
                    className="cursor-pointer"
                  />
                </a>
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
      </div>
      <AddNewFile
          isOpen={isOpen}
          onClose={onClose}
          getCourseData={getCourseData}
        />
    </div>
  );
};

export default CourseFiles;
