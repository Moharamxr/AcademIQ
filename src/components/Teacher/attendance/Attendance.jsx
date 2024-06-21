import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SmCircle from "../../../assets/icons/SmCircle";
import CheckedIcon from "../../../assets/icons/CheckedIcon";
import { useParams } from "react-router-dom";
import {
  getAttendance,
  reTakeAttendance,
  takeAttendance,
} from "../../../services/gradClass.service";
import { CircularProgress } from "@mui/material";
import { getGradeCourses } from "../../../services/courses.service";
import TimeTable from "../../Layout/timeTables/TimeTable";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TeacherGradesContainer = styled.div`
  height: 80vh;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const CustomDateField = styled(DateField)`
  border-width: 1px;
  border-color: rgba(209, 213, 219, 0.7);
  border-radius: 0.375rem;
`;

const Attendance = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [attendedStudents, setAttendedStudents] = useState([]);
  const [isAttendanceTaken, setIsAttendanceTaken] = useState(false);
  const [error, setError] = useState(null);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [period, setPeriod] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const handleSetPeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 8 && hour < 9) {
      setPeriod(1);
    } else if (hour >= 9 && hour < 10) {
      setPeriod(2);
    } else if (hour >= 10 && hour < 11) {
      setPeriod(3);
    } else if (hour >= 11 && hour < 12) {
      setPeriod(4);
    } else if (hour >= 12 && hour < 13) {
      setPeriod(5);
    } else if (hour >= 13 && hour < 14) {
      setPeriod(6);
    } else {
      setPeriod(0);
    }
  };

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const data = await getGradeCourses();
      setCourses(data?.courses);
      setCourseId(data?.courses[0]?._id);
    } catch (error) {
      console.error("Error fetching grade courses: ", error);
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchAttendance = async () => {
    if (!courseId ) {
      return;
    }

    try {
      const response = await getAttendance(id, dayjs().format("YYYY-MM-DD"), 7);
      const { attendance } = response;
      if (attendance) {
        setStudents(
          attendance.students.map((student) => ({
            id: student.student._id,
            name: student.student.username,
            checked: student?.status,
          }))
        );
      }
    } catch (error) {
      setError("There is no attendance for this period.");
      setTimeout(() => {
        setError(null);
      }, 3000);
      try {
        console.log("Automatic taking attendance: ", courseId, period)
        await takeAttendance(id, {
          courseId,
          period,
          students: [],
        });
        await getAttendance(id, dayjs().format("YYYY-MM-DD"), period);
      } catch (error) {
        console.error("Error automatic taking attendance: ", error.response.data.error)
      }
      
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [period, courseId]);

  const toggleCheck = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, checked: !student.checked } : student
      )
    );
  };

  useEffect(() => {
    const updatedAttendedStudents = students
      .map((student) => ({
        studentId: student.id,
        status: student?.checked ? "present" : "absent",
      }));
    setAttendedStudents(updatedAttendedStudents);
  }, [students]);


  

  const isValidate = () => {
    if (attendedStudents.length === 0) {
      setError("Please select at least one student.");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    } else {
      return true;
    }
  };

  const handleTakeAttendance = async () => {
    handleSetPeriod();
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    setAttendanceLoading(true);
    const newData = {
      date : dayjs().format("YYYY-MM-DD"),
      students: attendedStudents,
      period ,
    };
    try {
      await reTakeAttendance(id, newData);
      setIsAttendanceTaken(true);
      setAttendanceLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
      setAttendanceLoading(false);
    }
  };

  const selectAll = () => {
    setStudents(students.map((student) => ({ ...student, checked: true })));
  };

  const deselectAll = () => {
    setStudents(students.map((student) => ({ ...student, checked: false })));
  };

  const attends = () => {
    return students.filter((student) => student.checked).length;
  };

  return (
    <>
      <div className="w-full lg:w-8/12">
        <TeacherGradesContainer className="w-full bg-white rounded-xl">
          <FixedTopContent className="bg-white p-5 pb-0">
            <div className="flex justify-between">
              <h3 className="font-poppins font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed md:leading-none text-gray-700">
                Attendance
              </h3>
              {error && (
                <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center h-8">
                  {error}
                </p>
              )}
              <select
                className="h-12 border-2  border-gray-200 rounded-lg text-sm text-gray-700"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                {loadingCourses && <option >Loading...</option>}

                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between pt-4 pb-1 border-b-2 border-gray-200/70">
              <span className="font-poppins font-normal text-base leading-7 text-active">
                Name
              </span>
              <div className="flex gap-5">
                <div className="flex items-center gap-1">
                  <SmCircle color={"#00769E"} />
                  <span className="text-xs md:text-base">
                    {students.length} Total
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <SmCircle color={"#26B170"} />
                  <span className="text-xs md:text-base">
                    {attends()} Attend
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <SmCircle color={"#FE626B"} />
                  <span className="text-xs md:text-base">
                    {students.length - attends()} Absent
                  </span>
                </div>
              </div>
              <span className="font-poppins font-normal text-base leading-7 text-active">
                Status
              </span>
            </div>
          </FixedTopContent>
          <div className="flex flex-col py-4 gap-3 px-5">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex justify-between bg-gray-100 rounded-lg px-4 py-2"
              >
                <p>{student.name}</p>
                <button onClick={() => toggleCheck(student.id)}>
                  {student.checked ? (
                    <CheckedIcon checked={true} />
                  ) : (
                    <CheckedIcon />
                  )}
                </button>
              </div>
            ))}
          </div>
        </TeacherGradesContainer>
        <div className="flex justify-between pt-4">
          <button
            className={`py-3  text-white rounded-lg w-36 ${
              attendanceLoading ? "bg-gray-400" : "bg-active"
            }`}
            onClick={handleTakeAttendance}
            disabled={attendanceLoading}
          >
            {attendanceLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Submit"
            )}
          </button>
          <div className="flex gap-8">
            <button
              className="py-3 bg-transparent text-green-600 border-2 border-green-600 rounded-lg w-36 hover:bg-green-600 hover:text-white"
              onClick={selectAll}
            >
              Select All
            </button>
            <button
              className="py-3 bg-transparent text-red-600 border-2 border-red-600 rounded-lg w-36 hover:bg-red-600 hover:text-white"
              onClick={deselectAll}
            >
              Remove All
            </button>
          </div>
        </div>
      </div>
      <aside className="w-full lg:w-4/12 hidden md:block">
        <TimeTable />
      </aside>
    </>
  );
};

export default Attendance;
