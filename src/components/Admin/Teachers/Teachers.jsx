import React, { useEffect } from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import Stu1 from "../../../assets/connect-teatcher (2).png";
import styled from "@emotion/styled";
import AddNewTeacher from "./AddNewTeacher";
import { useState } from "react";
import { getUsers } from "../../../services/admin.service";
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
const Teachers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getData();
  };
  const onOpen = () => setIsOpen(true);
  const [teachers, setTeachers] = useState([]);

  const getData = async () => {
    try {
      const data = await getUsers("teacher");
      setTeachers(data.users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl ">Teachers</h2>
        <select
          name=""
          id=""
          className="bg-gray-100 rounded-lg p-3 outline-none"
        >
          <option value="">Class 1</option>
        </select>
      </FixedTopContent>
      {teachers.map((teacher, index) => (
        <div
          key={teacher._id}
          className="between py-3  border-2 border-gray-200/60 rounded-md px-6"
        >
          <div className="flex items-center gap-5">
            <span className="text-lg font-medium">{index + 1}</span>
            <img src={Stu1} alt="" className="w-9 h-9" />
            <p className="font-poppins font-medium">{teacher.username}</p>
          </div>
          <span className="cursor-pointer">
            <ThreeDots />
          </span>
        </div>
      ))}
      <FixedBottomContent className="bg-white py-5 flex flex-row-reverse">
        <button
          className="bg-active text-white rounded-lg py-3 px-6"
          onClick={onOpen}
        >
          Add Teacher
        </button>
      </FixedBottomContent>
      <AddNewTeacher isOpen={isOpen} onClose={onClose} />
    </ListContainer>
  );
};

export default Teachers;
