import React from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import Stu1 from "../../../assets/connect-teatcher (2).png";
import styled from "@emotion/styled";
import AddNewStudent from "./AddNewStudent";
import { useState } from "react";
const ListContainer = styled("main")({
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
const Students = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const students = [
    {
      id: 1,
      name: "Ahmed Hossam",
    },
    {
      id: 2,
      name: "Mohamed Ali",
    },
    {
      id: 3,
      name: "Ahmed Hossam",
    },
    {
      id: 4,
      name: "Mohamed Ali",
    },
    {
      id: 5,
      name: "Ahmed Hossam",
    },
    {
      id: 6,
      name: "Mohamed Ali",
    },
    {
      id: 7,
      name: "Ahmed Hossam",
    },
    {
      id: 8,
      name: "Mohamed Ali",
    },
    {
      id: 9,
      name: "Ahmed Hossam",
    },
    {
      id: 10,
      name: "Mohamed Ali",
    },
  ];
  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl ">Students</h2>
        <select
          name=""
          id=""
          className="bg-gray-100 rounded-lg p-3 outline-none"
        >
          <option value="">Class 1</option>
        </select>
      </FixedTopContent>
      {students.map((student) => (
        <div
          key={student.id}
          className="between py-3  border-2 border-gray-200/60 rounded-md px-6"
        >
          <div className="flex items-center gap-5">
            <span className="text-lg font-medium">{student.id}</span>
            <img src={Stu1} alt="" className="w-9 h-9" />
            <p className="font-poppins font-medium">{student.name}</p>
          </div>
          <span className="cursor-pointer   ">
            <ThreeDots />
          </span>
        </div>
      ))}
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
