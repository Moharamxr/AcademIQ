import React, { useEffect, useState } from "react";
import { createUser } from "../../../services/user.service";
import styled from "@emotion/styled";
import {
  getGradeClassStudents,
  getGradeClasses,
} from "../../../services/gradClass.service";

const ListContainer = styled("div")({
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const AddNewParent = ({ isOpen, onClose }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [newParentData, setNewParentData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    ssn: "",
    role: "parent",
    gender: "male",
    phone: "",
    city: "",
    street: "",
    state: "",
    jobRole: "engineer",
    children: [],
  });

  const [students, setStudents] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [isStudentsLoading, setIsStudentsLoading] = useState(false);

  const [selectedGradeClassId, setSelectedGradeClassId] = useState("");
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

  const fetchStudents = async () => {
    setIsStudentsLoading(true);
    try {
      const data = await getGradeClassStudents(selectedGradeClassId, false);
      const students = data?.students.filter(
        (student) =>
          (newParentData.gender === "male" &&
            student.parents.fatherId === null) ||
          (newParentData.gender === "female" &&
            student.parents.motherId === null)
      );
      setStudents(students);
    } catch (error) {
      console.error(error);
    }
    setIsStudentsLoading(false);
  };

  useEffect(() => {
    if (selectedGradeClassId !== "") {
      fetchStudents();
    }
  }, [selectedGradeClassId]);

  const [error, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setNewParentData({ ...newParentData, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setNewParentData({ ...newParentData, lastName: e.target.value });
  };

  const handleSSNChange = (e) => {
    setNewParentData({ ...newParentData, ssn: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setNewParentData({ ...newParentData, phone: e.target.value });
  };

  const handleCityChange = (e) => {
    setNewParentData({ ...newParentData, city: e.target.value });
  };

  const handleStreetChange = (e) => {
    setNewParentData({ ...newParentData, street: e.target.value });
  };

  const handleStateChange = (e) => {
    setNewParentData({ ...newParentData, state: e.target.value });
  };

  const handleGenderChange = (e) => {
    setNewParentData({ ...newParentData, gender: e.target.value });
  };

  const handleJobRoleChange = (e) => {
    setNewParentData({ ...newParentData, jobRole: e.target.value });
  };

  const handleStudentsChange = (e) => {
    if (newParentData.gender === "") {
      setError("select the gender first");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const selectedStudentId = e.target.value;
    const isExist = newParentData?.children?.find(
      (childId) => childId === selectedStudentId
    );
    if (isExist) {
      return;
    }
    setNewParentData({
      ...newParentData,
      children: [...newParentData.children, selectedStudentId],
    });
    const selectedStudent = students.find(
      (student) => student._id === selectedStudentId
    );
    setSelectedChildren([...selectedChildren, selectedStudent]);
  };

  const handleRemoveStudent = (id) => {
    const updatedChildren = selectedChildren.filter(
      (child) => child._id !== id
    );
    setSelectedChildren(updatedChildren);
    const updatedChildrenIds = newParentData.children.filter(
      (childId) => childId !== id
    );
    setNewParentData({ ...newParentData, children: updatedChildrenIds });
  };

  const reset = () => {
    setNewParentData({
      firstName: "",
      lastName: "",
      birthdate: "",
      ssn: "",
      role: "parent",
      phone: "",
      city: "",
      street: "",
      state: "",
      gradeClassId: "",
      children: [],
      jobRole: "",
    });
    setDay("");
    setMonth("");
    setYear("");
    setSelectedChildren([]);
    setSelectedGradeClassId("");
    setGradeClasses([]);
    setStudents([]);
    setError("");
  };

  const isValidate = () => {
    if (newParentData.firstName.length < 2) {
      setError("First name must be at least 2 characters");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newParentData.lastName.length < 2) {
      setError("Last name must be at least 2 characters");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (
      newParentData.ssn.length < 14 &&
      (!newParentData.ssn.startsWith("2") || !newParentData.ssn.startsWith("3"))
    ) {
      setError("SSN must be 14 characters and start with 2 or 3");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (
      newParentData.phone.length < 11 &&
      !newParentData.phone.startsWith("01")
    ) {
      setError("Phone must be 11 characters and start with 01");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newParentData.city.length === 0) {
      setError("City must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newParentData.street.length === 0) {
      setError("Street must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (newParentData.state.length === 0) {
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
    } else if (newParentData.children.length === 0) {
      setError("Add at least one child");
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

  const handleAddNewParent = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    const requestData = {
      firstName: newParentData.firstName,
      lastName: newParentData.lastName,
      birthdate: `${year}-${month}-${day}`,
      ssn: newParentData.ssn,
      gender: newParentData.gender,
      phone: newParentData.phone,
      city: newParentData.city,
      street: newParentData.street,
      state: newParentData.state,
      role: newParentData.role,
      jobRole: newParentData.jobRole,
      children: newParentData.children,
    };

    console.log(requestData);
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
    }
  };
  const renderDayOptions = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      const day = i < 10 ? `0${i}` : `${i}`;
      days.push(
        <option key={day} value={day}>
          {day}
        </option>
      );
    }

    return [
      <option key="" value="">
        Day
      </option>,
      ...days,
    ];
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <ListContainer className="bg-white rounded-xl p-5 w-2/3 max-h-[95vh]">
          <h2 className="font-poppins text-2xl font-medium">Add New Parent</h2>
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
                  {renderDayOptions()}
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
              >
                <option value="">select</option>
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
              <label htmlFor="jobRole" className="text-active">
                Jop Role
              </label>
              <input
                name="jobRole"
                id="jobRole"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleJobRoleChange}
              />
            </div>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
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
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Children" className="text-active">
                Children
              </label>
              <select
                name="Children"
                id="Children"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleStudentsChange}
              >
                <option value="">select</option>
                {!isStudentsLoading ? (
                  students.length > 0 ? (
                    students.map((stu, index) => (
                      <option key={index} value={stu._id}>
                        {stu.name.first} {stu.name.last}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No available students in this class
                    </option>
                  )
                ) : (
                  isStudentsLoading && (
                    <option value="" disabled>
                      loading...
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full mt-5">
            <label htmlFor="Children" className="text-active">
              Selected Children
            </label>

            <div className="grid grid-cols-4 gap-2 col-span-1">
              {selectedChildren.length > 0 ? (
                selectedChildren.map((child, index) => (
                  <span
                    key={index}
                    className="col-span-1 p-1 bg-active-bg text-center rounded-lg cursor-pointer"
                    onClick={() => handleRemoveStudent(child._id)}
                  >
                    {child?.name?.first?.slice(0, 8)}{" "}
                    {child?.name?.last?.slice(0, 8)}
                  </span>
                ))
              ) : (
                <span className="col-span-1 p-1 bg-gray-100 text-gray-500 text-center rounded-lg cursor-pointer">
                  No children selected
                </span>
              )}
            </div>
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white "
              onClick={handleAddNewParent}
            >
              {"Done"}
            </button>
            <button
              className="w-64 bg-white border-2 border-active-br rounded-lg p-3  text-center text-active "
              onClick={closeModel}
            >
              Cancel
            </button>
          </div>
        </ListContainer>
      </div>
    )
  );
};

export default AddNewParent;
