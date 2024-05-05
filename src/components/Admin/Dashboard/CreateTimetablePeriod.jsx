import React, { useEffect, useState } from "react";
import { createTimetablePeriod } from "../../../services/timetable.service";
import { getGradeCourses } from "../../../services/courses.service";
import { getTeachersByCourse } from "../../../services/user.service";

const CreateTimetablePeriod = ({ isOpen, onClose ,classId }) => {
  const [day, setDay] = useState("");
  const [period, setPeriod] = useState("");
  const [startTime, setStartTime] = useState({ hour: 0, minute: 0 });
  const [endTime, setEndTime] = useState({ hour: 0, minute: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [duration, setDuration] = useState("");

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    const per = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02"];
    if (e.target.value === "") {
      setDuration("");
      return;
    }
    setDuration(per[e.target.value - 1]);
    setStartTime({
      hour: parseInt(per[e.target.value - 1].split("-")[0]),
      minute: 0,
    });
    setEndTime({
      hour: parseInt(per[e.target.value - 1].split("-")[1]),
      minute: 0,
    });
  };

  const handleCourseIdChange = async (e) => {
    setCourseId(e.target.value);
    if (e.target.value === "") {
      return;
    }
    try {
      const data = await getTeachersByCourse(e.target.value);
      setTeachers(data.teachers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTeacherIdChange = (e) => {
    setTeacherId(e.target.value);
  };

  const isValidate = () => {
    if (day === "") {
      setError("Day must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (period === "") {
      setError("Period must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (courseId === "") {
      setError("Course ID must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (teacherId.trim() === "") {
      setError("Teacher ID must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const reset = () => {
    setDay("");
    setPeriod("");
    setStartTime({ hour: 0, minute: 0 });
    setEndTime({ hour: 0, minute: 0 });
    setCourseId("");
    setTeacherId("");
    setError("");
    setTeachers([]);
    setCourses([]);
    setDuration("");
  };

  const closeModal = () => {
    getCourses();
    reset();
    onClose();
  };

  const getCourses = async () => {
    if (!isOpen) {
      return;
    }
    try {
      const data = await getGradeCourses();
      setCourses(data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [isOpen]);

  const handleCreateTimetablePeriod = async () => {
    if (isValidate()) {
      setIsLoading(true);
      const newData = {
        day,
        period,
        courseId,
        teacherId,
        startTime,
        endTime,
        id: classId,
      };
      try {
        await createTimetablePeriod(newData);
        setIsLoading(false);
        reset();
        onClose();
      } catch (error) {
        setError(error.response.data.error);
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <section className="bg-white rounded-xl p-5 w-1/2">
          <h2 className="font-poppins text-2xl font-medium">
            Add New Timetable Period
          </h2>
          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded-lg text-center">
              {error}
            </p>
          )}
          <div className="between flex flex-col md:flex-row py-4 md:gap-10">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Day" className="text-active">
                Day
              </label>
              <select
                name="Day"
                id="Day"
                className="bg-gray-100 text-gray-500 p-2 rounded-lg outline-none"
                onChange={handleDayChange}
              >
                <option value="">select</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
              </select>
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Period" className="text-active">
                Period
              </label>
              <select
                name="Period"
                id="Period"
                className="bg-gray-100 text-gray-500 p-2 rounded-lg outline-none"
                onChange={handlePeriodChange}
                value={period}
              >
                <option value="">select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="courseId" className="text-active">
                Course
              </label>
              <select
                name="courseId"
                id="courseId"
                className="bg-gray-100 text-gray-500 p-2 rounded-lg outline-none"
                onChange={handleCourseIdChange}
                value={courseId}
              >
                <option value="">select</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="TeacherID" className="text-active">
                Teacher ID
              </label>
              <select
                name="TeacherID"
                id="TeacherID"
                className="bg-gray-100 text-gray-500 p-2 rounded-lg outline-none"
                onChange={handleTeacherIdChange}
                value={teacherId}
              >
                <option value="">select</option>
                {teachers?.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name.first} {teacher.name.last}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Duration" className="text-active">
                Duration
              </label>
              <p className="bg-gray-100 text-gray-500 p-2 rounded-lg outline-none">
                {duration ? duration : "--"}
              </p>
            </form>
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3 text-center text-white"
              disabled={isLoading}
              onClick={handleCreateTimetablePeriod}
            >
              {!isLoading ? "Done" : "...."}
            </button>
            <button
              className="w-64 bg-white border-active-br border-2 text-active rounded-lg p-3 text-center"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    )
  );
};

export default CreateTimetablePeriod;
