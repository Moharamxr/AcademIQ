import React, { useEffect, useState } from "react";
import { createUser } from "../../../services/user.service";
import { getGradeCourses } from "../../../services/courses.service";
import { CircularProgress } from "@mui/material";

const AddNewTeacher = ({ isOpen, onClose }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [newTeacherData, setNewTeacherData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    ssn: "",
    role: "teacher",
    gender: "",
    phone: "",
    city: "",
    street: "",
    state: "",
    department: "",
    courses: [],
  });

  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCourseIdChange = (e) => {
    setNewTeacherData({ ...newTeacherData, courses: [e.target.value] });
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

  const [error, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setNewTeacherData({ ...newTeacherData, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setNewTeacherData({ ...newTeacherData, lastName: e.target.value });
  };

  const handleSSNChange = (e) => {
    setNewTeacherData({ ...newTeacherData, ssn: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setNewTeacherData({ ...newTeacherData, phone: e.target.value });
  };

  const handleCityChange = (e) => {
    setNewTeacherData({ ...newTeacherData, city: e.target.value });
  };

  const handleStreetChange = (e) => {
    setNewTeacherData({ ...newTeacherData, street: e.target.value });
  };

  const handleStateChange = (e) => {
    setNewTeacherData({ ...newTeacherData, state: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    setNewTeacherData({ ...newTeacherData, department: e.target.value });
  };

  const handleGenderChange = (e) => {
    setNewTeacherData({ ...newTeacherData, gender: e.target.value });
  };

  const reset = () => {
    setNewTeacherData({
      firstName: "",
      lastName: "",
      birthdate: "",
      ssn: "",
      role: "teacher",
      gender: "",
      phone: "",
      city: "",
      street: "",
      state: "",
      department: "",
      courses: [],
    });
    setError("");
    setDay("");
    setMonth("");
    setYear("");
  };

  const closeModel = () => {
    reset();
    onClose();
  };
  const isValidate = () => {
    if (newTeacherData.firstName.length < 2) {
      setError("First name must be at least 2 characters");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newTeacherData.lastName.length < 2) {
      setError("Last name must be at least 2 characters");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (
      newTeacherData.ssn.length < 14 &&
      (!newTeacherData.ssn.startsWith("2") ||
        !newTeacherData.ssn.startsWith("3"))
    ) {
      setError("SSN must be 14 characters and start with 2 or 3");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (
      newTeacherData.phone.length < 11 &&
      !newTeacherData.phone.startsWith("01")
    ) {
      setError("Phone must be 11 characters and start with 01");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newTeacherData.city.length === 0) {
      setError("City must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newTeacherData.street.length === 0) {
      setError("Street must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newTeacherData.state.length === 0) {
      setError("State must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newTeacherData.department.length === 0) {
      setError("Department must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newTeacherData.courses.length === 0) {
      setError("Courses must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (day === "" || month === "" || year === "") {
      setError("Birthdate must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const handleAddNewTeacher = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }

    const requestData = {
      firstName: newTeacherData.firstName,
      lastName: newTeacherData.lastName,
      birthdate: `${year}-${month}-${day}`,
      ssn: newTeacherData.ssn,
      gender: newTeacherData.gender,
      phone: newTeacherData.phone,
      city: newTeacherData.city,
      street: newTeacherData.street,
      state: newTeacherData.state,
      department: newTeacherData.department,
      courses: newTeacherData.courses,
      role: newTeacherData.role,
    };
    setIsLoading(true);
    try {
      await createUser(requestData);
      setIsLoading(false);
      closeModel();
    } catch (error) {
      setIsLoading(false);
      setError(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <section className="bg-white rounded-xl p-5 w-1/2 overflow-auto max-h-full ">
          <h2 className="font-poppins text-2xl font-medium">Add New Teacher</h2>
          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center ">
              {error}
            </p>
          )}

          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="FirstName" className="text-active">
                First Name
              </label>
              <input
                name="FirstName"
                id="FirstName"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="LastName" className="text-active">
                Last Name
              </label>
              <input
                name="LastName"
                id="LastName"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleLastNameChange}
              />
            </div>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Birthdate" className="text-active">
                Birthdate
              </label>
              <div className="between gap-5" id="Birthdate">
                <select
                  name="Day"
                  id="Day"
                  className="bg-gray-100 text-gray-500 text-sm p-2 w-1/3  rounded-lg outline-none"
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                >
                  <option value="">Day</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select
                  name="Month"
                  id="Month"
                  className="bg-gray-100 text-gray-500 text-sm p-2 w-1/3  rounded-lg outline-none"
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                >
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  name="Year"
                  id="Year"
                  className="bg-gray-100 text-gray-500 text-sm p-2 w-1/3  rounded-lg outline-none"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 50 }, (_, i) => {
                    return (
                      <option key={i} value={2000 + i}>
                        {1960 + i}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Gender" className="text-active">
                Gender
              </label>
              <select
                name="Gender"
                id="Gender"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleGenderChange}
                value={newTeacherData.gender}
              >
                <option value="">Select </option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="SSN" className="text-active">
                SSN
              </label>
              <input
                name="SSN"
                id="SSN"
                type="number"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleSSNChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Phone" className="text-active">
                Phone
              </label>
              <input
                name="Phone"
                id="Phone"
                type="number"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="City" className="text-active">
                City
              </label>
              <input
                name="City"
                id="City"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleCityChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Street" className="text-active">
                Street
              </label>
              <input
                name="Street"
                id="Street"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleStreetChange}
              />
            </div>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="State" className="text-active">
                State
              </label>
              <input
                name="State"
                id="State"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleStateChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="department" className="text-active">
                Department
              </label>
              <input
                name="department"
                id="department"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleDepartmentChange}
              />
            </div>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="courseId" className="text-active">
                Course
              </label>
              <select
                name="courseId"
                id="courseId"
                className="bg-gray-100 text-gray-500 p-2 rounded-lg outline-none"
                onChange={handleCourseIdChange}
                value={newTeacherData.courses[0]}
              >
                <option value="">select</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white "
              onClick={handleAddNewTeacher}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Done"
              )}
            </button>
            <button
              className="w-64 bg-white rounded-lg p-3 border-2 border-active-br text-center text-active "
              onClick={closeModel}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    )
  );
};

export default AddNewTeacher;
