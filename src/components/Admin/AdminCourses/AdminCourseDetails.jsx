import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../../services/courses.service";
import styled from "@emotion/styled";
import UpdateCourse from "./UpdateCourse";
import { AddCircle } from "@mui/icons-material";
import AssignNewTeacher from "./AssignNewTeacher";
const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;
const AdminCourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getData();
  };
  const onOpen = () => setIsOpen(true);
  const getData = async () => {
    try {
      const data = await getCourseById(id);
      setCourseData(data.course);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [assignTeacherModal, setAssignTeacherModal] = useState(false);

  const handleOpenAssignTeacherModal = () => {
    setAssignTeacherModal(true);
  };

  const handleCloseAssignTeacherModal = () => {
    setAssignTeacherModal(false);
    getData();
  };

  return (
    courseData && (
      <div className="bg-white p-2 rounded-xl w-full ">
        <div className="center flex-col  py-10 gap-2">
          <p className="font-poppins font-light text-xl text-active  leading-8">
            {courseData.title}
          </p>
        </div>
        <div className="flex flex-col gap-y-3 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal text-sm leading-6 text-gray-400">
              Course Name:
              <span className="text-gray-600 text-base font-medium px-4">
                {courseData.title}
              </span>
            </p>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal text-sm leading-6 text-gray-400">
              Department:
              <span className="text-gray-600 text-base font-medium px-4">
                {courseData.department}
              </span>
            </p>
          </div>
          {courseData.gradeClass && (
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal text-sm leading-6 text-gray-400">
                Class:
                <span className="text-gray-600 text-base font-medium px-4">
                  Class {courseData.gradeClass.level}{" "}
                  {courseData.gradeClass.letter}
                </span>
              </p>
            </div>
          )}
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal text-sm leading-6 text-gray-400">
              Course Id :
              <span className="text-gray-600 text-base font-medium px-4 ">
                {courseData.courseId}
              </span>
            </p>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal text-sm leading-6 text-gray-400">
              Is Active :
              <span className="text-gray-600 text-base font-medium px-4 ">
                {courseData.isActive ? "Yes" : "No"}
              </span>
            </p>
          </div>

          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal text-sm leading-6 text-gray-400 pt-1">
              Teachers of this course :
            </p>
            {courseData?.teachers?.length > 0 && (
              <div className="flex flex-wrap gap-5">
                {courseData?.teachers?.map((t, index) => (
                  <span
                    key={index}
                    className="text-gray-600 text-base font-medium bg-active-bg rounded-lg p-2"
                  >
                    {t?.email}
                  </span>
                ))}
              </div>
            )}
            <span onClick={handleOpenAssignTeacherModal} className="pt-1">
              <AddCircle color="action" className="cursor-pointer" />
            </span>
            <AssignNewTeacher
              isOpen={assignTeacherModal}
              getData={getData}
              onClose={handleCloseAssignTeacherModal}
              gradeClassId={id}
              department={courseData?.department}
              currentTeachers={courseData?.teachers}
            />
          </div>
        </div>
        <FixedBottomContent className="bg-white py-5 pe-4 flex flex-row-reverse">
          <button
            className="bg-active text-white rounded-lg py-3 px-6"
            onClick={onOpen}
          >
            Edit Course
          </button>
        </FixedBottomContent>
        <UpdateCourse
          isOpen={isOpen}
          onClose={onClose}
          courseData={courseData}
          id={id}
        />
      </div>
    )
  );
};

export default AdminCourseDetails;
