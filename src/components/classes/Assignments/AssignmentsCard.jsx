import React from "react";
import PdfIcon from "../../../assets/vscode-icons_file-type-pdf2.png";
import AssignmentPic from "../../../assets/icons/AssignmentPic";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedAssignment } from "../../../store/slices/assignmentSlice";
import LaunchIcon from '@mui/icons-material/Launch';
const AssignmentsCard = ({ assignment }) => {
  const renderMaterialIcon = (type) => {
    switch (type) {
      case "application/pdf":
        return <img src={PdfIcon} alt="PDF Icon" />;
      case "image/png":
      case "image/jpeg":
        return <InsertPhotoIcon fontSize="large" />;
      default:
        return <img src={PdfIcon} alt="Default Icon" />;
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoToAssignments = () => {
    dispatch(setSelectedAssignment({assignment}));
    navigate(`/assignments`);
  };
  return (
    <div className="flex flex-col border-2 border-gray-200/70 bg-gray-50 hover:bg-white  rounded-xl w-full" >
      <div className="between p-4">
        <div className="flex gap-2">
          <AssignmentPic />
          <p className="font-poppins">
            {assignment?.title} <br />
            <time className="text-gray-300 text-sm">
              {assignment?.endDate.slice(0, 10)}
            </time>
          </p>
        </div>
        {/* <span className="pe-4">
          <ThreeDots />
        </span> */}
        <span onClick={handleGoToAssignments}>
          <LaunchIcon className="cursor-pointer" />
        </span>
      </div>
      <p className="px-4 py-2">
        Deadline:{" "}
        <time className="font-poppins font-light text-sm leading-10 text-gray-400">
          {assignment?.endDate.slice(0, 10) +
            " (" +
            new Date(assignment.startDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            ")"}
        </time>
      </p>
      {assignment?.materials?.length > 0 && (
        <div className="px-3 py-2">
          {assignment.materials.map((material) => (
            <div className="flex items-center gap-1 mb-2" key={material._id}>
              {renderMaterialIcon(material.type)}
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {material.title}
              </a>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default AssignmentsCard;
