import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { updateCourse } from "../../../services/courses.service";
import dayjs from "dayjs";
import { getGradeClasses } from "../../../services/gradClass.service";

const UpdateCourse = ({ isOpen, onClose, id, courseData }) => {
  if (!courseData) return null;

  const { title, department, gradeClass, schedule } = courseData;

  const [courseTitle, setCourseTitle] = useState(title);
  const [courseDepartment, setCourseDepartment] = useState(department);

  const [courseStartDate, setCourseStartDate] = useState(
    dayjs(schedule?.startDate)
  );
  const [courseEndDate, setCourseEndDate] = useState(dayjs(schedule?.endDate));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedGradeClassId, setSelectedGradeClassId] = useState(
    gradeClass?.gradeClassId
  );
  const [gradClasses, setGradeClasses] = useState([]);
  const [isGradeClassesLoading, setIsGradeClassesLoading] = useState(false);

  const handleGradeClassChange = (e) => {
    setSelectedGradeClassId(e.target.value);
  };

  const fetchGradeClasses = async () => {
    setIsGradeClassesLoading(true);
    try {
      const data = await getGradeClasses();
      setGradeClasses(data.gradeClasses);
    } catch (error) {
      console.error(error);
    }
    setIsGradeClassesLoading(false);
  };

  useEffect(() => {
    fetchGradeClasses();
  }, []);

  useEffect(() => {
    if (schedule && schedule.startDate) {
      setCourseStartDate(dayjs(schedule.startDate));
    }
    if (schedule && schedule.endDate) {
      setCourseEndDate(dayjs(schedule.endDate));
    }
    setCourseTitle(title);
    setCourseDepartment(department);
    setSelectedGradeClassId(gradeClass?.gradeClassId);
    setCourseStartDate(dayjs(schedule?.startDate));
    setCourseEndDate(dayjs(schedule?.endDate));
  }, [courseData]);

  const closeModal = () => {
    reset();
    onClose();
  };

  const handleTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setCourseDepartment(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setCourseStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setCourseEndDate(date);
  };

  const isValidate = () => {
    if (courseTitle === "") {
      setError("Title must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (courseDepartment === "") {
      setError("Department must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (selectedGradeClassId === "") {
      setError("Grade Class ID must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (courseStartDate === null || courseEndDate === null) {
      setError("Start Date and End Date must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (courseStartDate.isAfter(courseEndDate)) {
      setError("End date must be after start date");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }

    return true;
  };

  const reset = () => {
    setCourseTitle(title);
    setCourseDepartment(department);
    setSelectedGradeClassId(gradeClass?.gradeClassId);
    setCourseStartDate(dayjs(schedule?.startDate));
    setCourseEndDate(dayjs(schedule?.endDate));
    setError("");
    setIsLoading(false);
  };

  const handleUpdateCourse = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    const newData = {
      title: courseTitle,
      department: courseDepartment,
      gradeClassId: selectedGradeClassId,
      startDate: courseStartDate ? courseStartDate.format("YYYY-MM-DD") : null,
      endDate: courseEndDate ? courseEndDate.format("YYYY-MM-DD") : null,
    };

    setIsLoading(true);
    try {
      await updateCourse(id, newData);
      setIsLoading(false);
      setError(null);
      onClose();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <section className="bg-white rounded-xl p-5 w-1/2">
          <h2 className="font-poppins text-2xl font-medium">Edit Course</h2>
          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center">
              {error}
            </p>
          )}
          <div className="between flex flex-col md:flex-row py-4 md:gap-10">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Title" className="text-active">
                Title
              </label>
              <input
                type="text"
                name="Title"
                id="Title"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleTitleChange}
                value={courseTitle}
              />
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Department" className="text-active">
                Department
              </label>
              <input
                name="Department"
                id="Department"
                type="text"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleDepartmentChange}
                value={courseDepartment}
              />
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Start Date"
                  value={courseStartDate}
                  format="YYYY-MM-DD"
                  onChange={handleStartDateChange}
                  className="bg-gray-100 rounded-md text-active border-0 outline-none"
                />
              </LocalizationProvider>
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="End Date"
                  value={courseEndDate}
                  format="YYYY-MM-DD"
                  onChange={handleEndDateChange}
                  className="bg-gray-100 rounded-md text-active border-0 outline-none"
                />
              </LocalizationProvider>
            </form>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <label htmlFor="Classes" className="text-active">
              Classes
            </label>
            <select
              name="Classes"
              id="Classes"
              className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
              onChange={handleGradeClassChange}
              value={selectedGradeClassId}
            >
              <option value="">select</option>
              {!isGradeClassesLoading ? (
                gradClasses?.map((cl, index) => (
                  <option key={index} value={cl._id}>
                    Class {cl.letter} {cl.level}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  loading...
                </option>
              )}
            </select>
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white"
              onClick={handleUpdateCourse}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Done"}
            </button>
            <button
              className="w-64 bg-white border-active-br border-2 text-active rounded-lg p-3  text-center"
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

export default UpdateCourse;
