import React, { useEffect } from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import Stu1 from "../../../assets/connect-teatcher (2).png";
import styled from "@emotion/styled";
import AddNewStudent from "./AddNewStudent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../services/user.service";
import { Skeleton } from "@mui/material";
const ListContainer = styled("div")({
  height: "85vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "lightgray",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
});
const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;
const Students = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getData();
  };
  const onOpen = () => setIsOpen(true);

  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers("student");
      setIsLoading(false);
      setStudents(data?.users);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl">Students</h2>
        {/* <select
          name=""
          id=""
          className="bg-gray-100 rounded-lg p-3 outline-none"
        >
          <option value="">Class 1</option>
        </select> */}
      </FixedTopContent>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
        {!isLoading ? (
          students?.map((student, index) => (
            <div
              key={index}
              className=" bg-active-bg border-2 border-blue-200 center flex-col p-4 gap-1 rounded-xl hover:bg-slate-50 hover:cursor-pointer overflow-hidden"
              onClick={() => navigate(`/admin/user/${student._id}`)}
            >
              {isLoading ? (
                <Skeleton variant="circular" width={160} height={160} />
              ) : student?.profilePicture?.url ? (
                <img
                  src={student?.profilePicture?.url}
                  alt="profile-Pic"
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div
                  className="w-16 h-16 text-white text-2xl rounded-full center mr-2 select-none"
                  style={{ backgroundColor: student?.profilePicture?.color }}
                >
                  {student?.name?.first.charAt(0).toUpperCase() + student?.name?.last.charAt(0).toUpperCase()} 
                </div>
              )}{" "}
              <span className="text-center text-gray-900 font-poppins font-medium">
              {student?.name?.first +' '+ student?.name?.last} 
              </span>
              
              <span className="text-center text-gray-500 font-poppins text-sm">
                {student?.email}
              </span>
              {/* <button className="bg-active text-white rounded-lg py-2 px-4">
                View Profile
              </button> */}
            </div>
          ))
        ) : (
          <>
            <Skeleton variant="rounded" height={180} />
            <Skeleton variant="rounded" height={180} />
            <Skeleton variant="rounded" height={180} />
            <Skeleton variant="rounded" height={180} />
            <Skeleton variant="rounded" height={180} />
            <Skeleton variant="rounded" height={180} />
            <Skeleton variant="rounded" height={180} />
          </>
        )}
      </div>
      <FixedBottomContent className="bg-white py-5 flex flex-row-reverse">
        <button
          className="bg-active text-white rounded-lg py-3 px-6"
          onClick={onOpen}
        >
          Add Student
        </button>
      </FixedBottomContent>
      <AddNewStudent isOpen={isOpen} onClose={onClose} />
    </ListContainer>
  );
};

export default Students;
