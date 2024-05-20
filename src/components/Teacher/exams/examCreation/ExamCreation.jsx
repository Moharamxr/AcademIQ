import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGradeCourses } from "../../../../services/courses.service";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { updateAssessment } from "../../../../services/assessment.service";
import { CircularProgress } from "@mui/material";

const ExamCreation = () => {
  const { id } = useParams();
  const levels = Array.from({ length: 12 }, (_, i) => i + 1);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [gradeCourses, setGradeCourses] = useState([]);

  const getCourses = async () => {
    try {
      const coursesData = await getGradeCourses();
      setGradeCourses(coursesData.courses);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e);
  };
  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const isValidate = () => {
    if (startDate >= endDate) {
      setError("End date should be after the start date");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (startDate < dayjs()) {
      setError("Start date should be after the current date");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (title === "") {
      setError("Title is required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (selectedCourse === "") {
      setError("Course is required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (selectedLevel === "") {
      setError("Grade is required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (duration === "") {
      setError("Duration is required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    const requestBody = {
      title,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      duration,
      courseId: selectedCourse,
    };
    console.log("requestBody", requestBody);
    setIsSubmitting(true);
    try {
      await updateAssessment(id, requestBody);
      setIsSubmitting(false);
      navigate("/exams");
    } catch (error) {
      console.error("Error updating assessment: ", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-4">
      <h2 className="font-poppins text-2xl font-medium">Exam Creation</h2>
      {error && (
        <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center mt-2">
          {error}
        </p>
      )}

      <div className="between flex flex-col md:flex-row py-4 md:gap-20 ">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="StartDate" className="text-active">
            Start Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={startDate}
              onChange={handleStartDateChange}
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="Duration" className="text-active">
            End Start
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker value={endDate} onChange={handleEndDateChange} />
          </LocalizationProvider>
        </div>
      </div>
      <div className="between flex flex-col md:flex-row py-4 md:gap-20 ">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="Course" className="text-active">
            Title
          </label>
          <input
            name="Course"
            id="Course"
            className="bg-white border-[0.5px] border-gray-400/70  text-gray-800 p-2 h-14 rounded-[4px] outline-none hover:border-black "
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="Duration" className="text-active">
            Duration <span className="text-sm">{"(in minutes)"}</span>
          </label>
          <input
            name="Course"
            id="Course"
            type="number"
            className="bg-white border-[0.5px] border-gray-400/70  text-gray-800 p-2 h-14 rounded-[4px] outline-none hover:border-black"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>
      </div>
      <div className="between flex flex-col md:flex-row py-4 md:gap-20 ">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="Course" className="text-active">
            Course
          </label>
          <select
            name="Course"
            id="Course"
            className="bg-white border-[0.5px] border-gray-400/70  text-gray-800 p-2 h-14 rounded-[4px] outline-none hover:border-black"
            value={selectedCourse}
            onChange={handleCourseChange}
          >
            <option value="" className="text-lg text-gray-600">
              Select Course
            </option>
            {gradeCourses.map((course) => (
              <option
                key={course._id}
                value={course._id}
                className="text-lg text-gray-600"
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="subject" className="text-active">
            Grade
          </label>
          <select
            name="subject"
            id="subject"
            className="bg-white border-[0.5px] border-gray-400/70  text-gray-800 p-2 h-14 rounded-[4px] outline-none hover:border-black"
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            <option value="" className="text-lg text-gray-600">
              Select Grade
            </option>
            {levels.map((level, index) => (
              <option
                key={index}
                value={level}
                className="text-lg text-gray-600"
              >
                Grade {level}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="center pt-8 pb-4">
        <button
          className="w-56 bg-active rounded-lg p-3  text-center text-white "
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            "Submit Exam Details"
          )}
        </button>
      </div>
    </div>
  );
};

export default ExamCreation;
