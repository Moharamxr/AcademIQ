import React, { useEffect, useState } from "react";
import { createUser } from "../../../services/user.service";
import { getGradeClasses } from "../../../services/gradClass.service";
import { CircularProgress } from "@mui/material";

const AddNewStudent = ({ isOpen, onClose }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [newStudentData, setNewStudentData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    ssn: "",
    role: "student",
    gender: "male",
    phone: "",
    city: "",
    street: "",
    state: "",
    gradeClassId: "",
  });

  const [gradeClasses, setGradeClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGradeClasses = async () => {
    try {
      const data = await getGradeClasses();
      setGradeClasses(data.gradeClasses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGradeClasses();
  }, []);

  const [error, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setNewStudentData({ ...newStudentData, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setNewStudentData({ ...newStudentData, lastName: e.target.value });
  };

  const handleSSNChange = (e) => {
    setNewStudentData({ ...newStudentData, ssn: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setNewStudentData({ ...newStudentData, phone: e.target.value });
  };

  const handleCityChange = (e) => {
    setNewStudentData({ ...newStudentData, city: e.target.value });
  };

  const handleStreetChange = (e) => {
    setNewStudentData({ ...newStudentData, street: e.target.value });
  };

  const handleStateChange = (e) => {
    setNewStudentData({ ...newStudentData, state: e.target.value });
  };

  const handleGenderChange = (e) => {
    setNewStudentData({ ...newStudentData, gender: e.target.value });
  };

  const handleGradeClassIdChange = (e) => {
    setNewStudentData({ ...newStudentData, gradeClassId: e.target.value });
  };

  const reset = () => {
    setNewStudentData({
      firstName: "",
      lastName: "",
      birthdate: "",
      ssn: "",
      role: "student",
      phone: "",
      city: "",
      street: "",
      state: "",
      gradeClassId: "",
    });
  };

  const isValidate = () => {
    if (newStudentData.firstName.length < 2) {
      setError("First name must be at least 2 characters");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newStudentData.lastName.length < 2) {
      setError("Last name must be at least 2 characters");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (
      newStudentData.ssn.length < 14 &&
      (!newStudentData.ssn.startsWith("2") ||
        !newStudentData.ssn.startsWith("3"))
    ) {
      setError("SSN must be 14 characters and start with 2 or 3");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (
      newStudentData.phone.length < 11 &&
      !newStudentData.phone.startsWith("01")
    ) {
      setError("Phone must be 11 characters and start with 01");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newStudentData.city.length === 0) {
      setError("City must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newStudentData.street.length === 0) {
      setError("Street must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newStudentData.state.length === 0) {
      setError("State must be filled");
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
    } else if (newStudentData.gradeClassId.length === 0) {
      setError("Grade Class ID must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
    return true;
  };
  const closeModel = () => {
    reset();
    onClose();
  };

  const handleAddNewStudent = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    const requestData = {
      firstName: newStudentData.firstName,
      lastName: newStudentData.lastName,
      birthdate: `${year}-${month}-${day}`,
      ssn: newStudentData.ssn,
      gender: newStudentData.gender,
      phone: newStudentData.phone,
      city: newStudentData.city,
      street: newStudentData.street,
      state: newStudentData.state,
      gradeClassId: newStudentData.gradeClassId,
      role: newStudentData.role,
    };

    console.log(requestData);
    setIsLoading(true);
    try {
      const data = await createUser(requestData);
      console.log(data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong");
      }
    }finally{
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <section className="bg-white rounded-xl p-5 w-1/2">
          <h2 className="font-poppins text-2xl font-medium">
            Add New Student{" "}
          </h2>
          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center ">
              {error}
            </p>
          )}

          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="FirstName" className="text-active">
                First Name
              </label>
              <input
                name="FirstName"
                id="FirstName"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleFirstNameChange}
              />
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="LastName" className="text-active">
                Last Name
              </label>
              <input
                name="LastName"
                id="LastName"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleLastNameChange}
              />
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="date" className="text-active">
                Date
              </label>
              <div className="between gap-5" id="date">
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
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Gender" className="text-active">
                Gender
              </label>
              <select
                name="Gender"
                id="Gender"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleGenderChange}
              >
                <option value="">select</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
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
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
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
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="City" className="text-active">
                City
              </label>
              <input
                name="City"
                id="City"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleCityChange}
              />
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Street" className="text-active">
                Street
              </label>
              <input
                name="Street"
                id="Street"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleStreetChange}
              />
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="State" className="text-active">
                State
              </label>
              <input
                name="State"
                id="State"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleStateChange}
              />
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="GradeClass" className="text-active">
                Grade Class
              </label>
              <select
                name="GradeClass"
                id="GradeClass"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onClick={handleGradeClassIdChange}
              >
                {gradeClasses.map((gradeClass, index) => (
                  <option key={index} value={gradeClass._id}>
                    Class {gradeClass.letter} {gradeClass.level}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white "
              onClick={handleAddNewStudent}
            >
              {isLoading ? <CircularProgress size={16} color="inherit" /> : "Add Student"}
            </button>
            <button
              className="w-64 bg-white border-2 border-active-br rounded-lg p-3  text-center text-active "
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

export default AddNewStudent;
