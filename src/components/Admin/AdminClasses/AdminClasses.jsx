import React from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import Stu1 from "../../../assets/connect-teatcher (2).png";
import styled from "@emotion/styled";
import { useState } from "react";
import AddNewClass from "./AddNewClass";
import { getGradeClasses } from "../../../services/admin.service";
import { useEffect } from "react";
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
  
  const [gradeClasses, setGradeClasses] = useState([]);

  const getData = async () => {
    try {
      const data = await getGradeClasses();
      setGradeClasses(data.gradeClasses);
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
        <h2 className="text-2xl ">Classes</h2>
        <select
          name=""
          id=""
          className="bg-gray-100 rounded-lg p-3 outline-none"
        >
          <option value="">Class 1</option>
        </select>
      </FixedTopContent>
      {Array.isArray(gradeClasses) &&
        gradeClasses.map((classData) => (
          <div
            key={classData._id}
            className="between py-3 border-2 border-gray-200/60 rounded-md px-6"
          >
            <div className="flex items-center gap-5">
              <span className="text-lg font-medium">
                {classData.gradeClassId}
              </span>
              <p className="font-poppins font-medium">{classData.letter}</p>
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
          Add Class
        </button>
      </FixedBottomContent>
      <AddNewClass isOpen={isOpen} onClose={onClose} />
    </ListContainer>
  );
};

export default AdminClasses;
