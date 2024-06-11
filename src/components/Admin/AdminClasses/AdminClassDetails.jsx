import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { getGradeClassById } from "../../../services/gradClass.service";
import UpdateClass from "./UpdateClass";
import { AddAlarm, AddCircle } from "@mui/icons-material";
import AssignNewStudent from "./AssignNewStudent";
import AssignNewCourse from "./AssignNewCourse";

const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const AdminClassDetails = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    getData();
  };

  const onOpen = () => setIsOpen(true);

  const getData = async () => {
    try {
      const data = await getGradeClassById(id);
      setClassData(data.gradeClass);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [assignStudentModal, setAssignStudentModal] = useState(false);

  const handleOpenAssignStudentModal = () => {
    setAssignStudentModal(true);
  };

  const handleCloseAssignStudentModal = () => {
    setAssignStudentModal(false);
    getData();
  };
  const [assignCourseModal, setAssignCourseModal] = useState(false);

  const openAssignCourseModal = () => {
    setAssignCourseModal(true);
  };

  const closeAssignCourseModal = () => {
    setAssignCourseModal(false);
    getData();
  };

  return (
    <div className="bg-white p-2 rounded-xl w-full">
      {classData && (
        <>
          <div className="center flex-col py-10 gap-2">
            <p className="font-poppins font-medium text-3xl text-active leading-8">
              Class {classData?.level} {classData?.letter}
            </p>
          </div>
          <div className="flex flex-col gap-y-3 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Class Name:
                <span className="text-gray-600 text-base font-medium px-4">
                  Class {classData?.level} {classData?.letter}
                </span>
              </p>
            </div>
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Level :
                <span className="text-gray-600 text-base font-medium px-4">
                  {classData?.level}
                </span>
              </p>
            </div>
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Letter :
                <span className="text-gray-600 text-base font-medium px-4">
                  {classData.letter}
                </span>
              </p>
            </div>
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Class Id :
                <span className="text-gray-600 text-base font-medium px-4 ">
                  {classData.gradeClassId}
                </span>
              </p>
            </div>
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Room :
                <span className="text-gray-600 text-base font-medium px-4 ">
                  {classData.room}
                </span>
              </p>
            </div>

            <div className="flex gap-5 pt-4 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Courses of this Class :
              </p>
              <div className="grid grid-cols-4 gap-5">
                {classData?.courses?.map((c, index) => (
                  <div className="center gap-1 col-span-1" key={index}>
                    <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                      <span className="text-gray-600 text-base font-medium bg-active-bg rounded-lg p-2">
                        {c.title}
                      </span>
                    </p>
                  </div>
                ))}
                <span onClick={openAssignCourseModal}>
                <AddCircle color="action" className="cursor-pointer pt-1" />
              </span>
              <AssignNewCourse
                isOpen={assignCourseModal}
                getData={getData}
                onClose={closeAssignCourseModal}
                gradeClassId={id}
                currentCourses={classData?.courses}
              />
              </div>
            </div>

            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400 pt-1">
                Students of this Class :
              </p>
              {classData?.students?.length > 0 && (
                <div className="flex flex-wrap gap-5">
                  {classData?.students?.map((s, index) => (
                    <div className="center gap-1 " key={index}>
                        <span className="text-gray-600 text-base font-medium bg-active-bg rounded-lg p-2">
                          {s?.email}
                        </span>
                    </div>
                  ))}
                </div>
              )}

              <span onClick={handleOpenAssignStudentModal}>
                <AddCircle color="action" className="cursor-pointer pt-1" />
              </span>
              <AssignNewStudent
                isOpen={assignStudentModal}
                getData={getData}
                onClose={handleCloseAssignStudentModal}
                gradeClassId={id}
                currentStudents={classData?.students}
              />
            </div>
          </div>
          <FixedBottomContent className="bg-white py-5 px-4 flex flex-row-reverse">
            <button
              className="bg-active text-white rounded-lg py-3 px-6"
              onClick={onOpen}
            >
              Edit Class
            </button>
          </FixedBottomContent>
          <UpdateClass
            isOpen={isOpen}
            onClose={onClose}
            classData={classData}
            id={id}
          />
        </>
      )}
    </div>
  );
};

export default AdminClassDetails;
