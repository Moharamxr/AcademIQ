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
  maxHeight: "85vh",
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
  const [selectedGrade, setSelectedGrade] = useState(0);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getGradeClasses();
      if (parseInt(selectedGrade) === 0) {
        setGradeClasses(data.gradeClasses);
      } else {
        setGradeClasses(
          data?.gradeClasses?.filter(
            (gradeClass) => gradeClass.level === parseInt(selectedGrade)
          )
        );
      }
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
  }, [selectedGrade]);

  const navigateToClassDetails = (classId) => {
    navigate(`/admin/classes/${classId}`);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };


  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl ">Classes</h2>
        <select
          name="grades"
          id="grades"
          className="bg-gray-100 rounded-lg p-3 outline-none"
          onChange={handleGradeChange}
          value={selectedGrade}
        >
          <option value={0}>All Grades</option>
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <option key={index} value={index + 1}>
                Grade {index + 1}
              </option>
            ))}
        </select>
      </FixedTopContent>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 grid-cols-2  gap-5 ">

      {!isLoading ? (
        Array.isArray(gradeClasses) && gradeClasses.length > 0 ? (
        gradeClasses.map((classData) => (
          <div
            key={classData._id}
            className="col-span-1 bg-green-100 p-5  py-14 center border-2 border-green-600 rounded-lg  hover:bg-green-200 cursor-pointer text-center text-green-700 text-lg"
            onClick={() => navigateToClassDetails(classData._id)}
          >
                <span className="font-poppins font-medium">
                  Class {classData.level} {classData.letter}
                </span>
          </div>
        )) 
      ) : (
        <div className="text-center text-lg text-gray-400">
          No Classes available for this grade
        </div>
      )
      ) : (
        <>
          <Skeleton variant="rounded" height={110} />
          <Skeleton variant="rounded" height={110} />
          <Skeleton variant="rounded" height={110} />
          <Skeleton variant="rounded" height={110} />
          <Skeleton variant="rounded" height={110} />
          <Skeleton variant="rounded" height={110} />
          <Skeleton variant="rounded" height={110} />
        </>
      )}
      </div>

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
