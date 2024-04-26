import React from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import styled from "@emotion/styled";
import { useState } from "react";
import AddNewClass from "./AddNewClass";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGradeClasses } from "../../../services/gradClass.service";
import { Skeleton } from "@mui/material";
const ListContainer = styled("div")({
  height: "38rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
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
const AdminClasses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [gradeClasses, setGradeClasses] = useState([]);
  const [reservedClassRooms, setReservedClassRooms] = useState([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getGradeClasses();
      setGradeClasses(data.gradeClasses);
      setIsLoading(false);
      const rooms = data.gradeClasses.map((gradeClass) => gradeClass.room);
      setReservedClassRooms(rooms);
    } catch (error) {
      console.error("Error fetching grade classes: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl ">Classes</h2>
        <select
          name=""
          id=""
          className="bg-gray-100 rounded-lg p-3 outline-none"
        >
          <option value="">Class 1</option>
        </select>
      </FixedTopContent>
      {!isLoading ? (
        Array.isArray(gradeClasses) &&
        gradeClasses.map((classData, index) => (
          <div
            key={classData._id}
            className="class-card mb-4 hover:bg-slate-100 hover:cursor-pointer"
          >
            <div className="class-info flex items-center justify-between py-3 border border-gray-200 rounded-md px-6">
              <div className="class-details flex items-center space-x-5">
                <span className="text-lg font-medium">{index + 1}</span>
                <p className="font-poppins font-medium">
                  Class {classData.level} {classData.letter}
                </p>
              </div>
              <span className="more-options cursor-pointer">
                <ThreeDots />
              </span>
            </div>
          </div>
        ))
      ) : (
        <>
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
        </>
      )}

      <FixedBottomContent className="bg-white py-5 flex flex-row-reverse">
        <button
          className="bg-active text-white rounded-lg py-3 px-6"
          onClick={onOpen}
        >
          Add Class
        </button>
      </FixedBottomContent>
      <AddNewClass
        isOpen={isOpen}
        onClose={onClose}
        reservedClassRooms={reservedClassRooms}
      />
    </ListContainer>
  );
};

export default AdminClasses;
