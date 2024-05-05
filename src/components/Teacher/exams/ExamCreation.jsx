import React, { useEffect } from "react";
import AddQuestion from "./AddQuestion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectQuestions from "./SelectQuestions";
import { getGradeCourses } from "../../../services/courses.service";
import {
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { updateAssessment } from "../../../services/assessment.service";

const ExamCreation = () => {
  const { id } = useParams();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddClose = () => setIsAddOpen(false);
  const onAddOpen = () => setIsAddOpen(true);

  const navigate = useNavigate();

  const levels = Array.from({ length: 12 }, (_, i) => i + 1);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState("");

  const [error , setError] = useState('');

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
      setError('End date should be after the start date');
      setTimeout(() => {
        setError('');
      }, 3000);
      return false;
    } else if (title === '') {
      setError('Title is required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return false;
    } else if (selectedCourse === '') {
      setError('Course is required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return false;
    } else if (selectedLevel === '') {
      setError('Grade is required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return false;
    } else if (duration === '') {
      setError('Duration is required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return false;
    }
    return true;
  };
  

  const handleSubmit = async () => {
    const requestBody = {
      title,
      description:'',
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      duration,
      courseId: selectedCourse,
    };
    console.log('requestBody', requestBody)
    try {
      await updateAssessment(id, requestBody);
    } catch (error) {
      console.error("Error creating exam: ", error);
    }
  };

  const handleGoToSelectQuestions = () => {
   
      navigate("select-questions");
    
    
  };

  return (
    <div className="w-full bg-white rounded-xl p-4">
      <h2 className="font-poppins text-2xl font-medium">Exam Creation </h2>
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
            className="bg-white border-[0.5px] border-gray-400/70  text-gray-800 p-2 h-14 rounded-[4px] outline-none"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="Duration" className="text-active">
            Duration <span className="text-sm">{'(in minutes)'}</span>
          </label>
          <input
            name="Course"
            id="Course"
            type="number"
            className="bg-white border-[0.5px] border-gray-400/70  text-gray-800 p-2 h-14 rounded-[4px] outline-none"
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
            className="bg-white border-[0.5px] border-gray-400/70  text-gray-800 p-2 h-14 rounded-[4px] outline-none"
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
            className="bg-white border-[0.5px] border-gray-400/70  text-gray-800 p-2 h-14 rounded-[4px] outline-none"
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
        >
          Submit Exam Details 
        </button>
      </div>

      <h3 className="text-gray-700 text-xl py-4">Do you want to...</h3>
      <div className="center gap-7 py-4">
        <button
          className="bg-active-bg border-2 border-active-br p-4 rounded-lg text-active"
          onClick={handleGoToSelectQuestions}
        >
          Choose From Question Bank ?
        </button>
        <span className="p-2 px-7 text-gray-600 text-lg">Or</span>
        <button
          className="bg-active-bg  border-2 border-active-br p-4 px-12  rounded-lg text-active"
          onClick={onAddOpen}
        >
          Add New Question ?
        </button>
      </div>
      <div className="center pt-8 pb-4">
        <button
          className="w-56 bg-active rounded-lg p-3  text-center text-white "
          
        >
          Done
        </button>
      </div>
      <AddQuestion isOpen={isAddOpen} onClose={onAddClose} id={id} />
    </div>
  );
};

export default ExamCreation;
