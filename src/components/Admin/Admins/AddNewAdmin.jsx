import React, { useState } from "react";
import { createUser } from "../../../services/admin.service";

const AddNewAdmin = ({ isOpen, onClose }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [newAdminData, setNewAdminData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    ssn: "",
    role: "admin",
    gender: "male",
    phone: "",
    city: "",
    street: "",
    state: "",
    gradeClassID: "",
  });

  const [error, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setNewAdminData({ ...newAdminData, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setNewAdminData({ ...newAdminData, lastName: e.target.value });
  };

  const handleSSNChange = (e) => {
    setNewAdminData({ ...newAdminData, ssn: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setNewAdminData({ ...newAdminData, phone: e.target.value });
  };

  const handleCityChange = (e) => {
    setNewAdminData({ ...newAdminData, city: e.target.value });
  };

  const handleStreetChange = (e) => {
    setNewAdminData({ ...newAdminData, street: e.target.value });
  };

  const handleStateChange = (e) => {
    setNewAdminData({ ...newAdminData, state: e.target.value });
  };

  const handleGenderChange = (e) => {
    setNewAdminData({ ...newAdminData, gender: e.target.value });
  };

 

  const reset = () => {
    setNewAdminData({
      firstName: "",
      lastName: "",
      birthdate: "",
      ssn: "",
      role: "admin",
      phone: "",
      city: "",
      street: "",
      state: "",
    });
  };

  const isValidate = () => {
    if (newAdminData.firstName.length < 2) {
      setError("First name must be at least 2 characters");
      return false;
    } else if (newAdminData.lastName.length < 2) {
      setError("Last name must be at least 2 characters");
      return false;
    } else if (
      newAdminData.ssn.length < 14 &&
      (!newAdminData.ssn.startsWith("2") || !newAdminData.ssn.startsWith("3"))
    ) {
      setError("SSN must be 14 characters and start with 2 or 3");
      return false;
    } else if (
      newAdminData.phone.length < 11 &&
      !newAdminData.phone.startsWith("01")
    ) {
      setError("Phone must be 11 characters and start with 01");
      return false;
    } else if (newAdminData.city.length === 0) {
      setError("City must be filled");
      return false;
    } else if (newAdminData.street.length === 0) {
      setError("Street must be filled");
      return false;
    } else if (newAdminData.state.length === 0) {
      setError("State must be filled");
      return false;
    } else if (day === "" || month === "" || year === "") {
      setError("Birthdate must be filled");
      return false;
    }

    // If all validations pass, clear the error after 3 seconds
    setTimeout(() => {
      setError("");
    }, 3000);

    return true;
  };

  const handleAddNewAdmin = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    const requestData = {
      firstName: newAdminData.firstName,
      lastName: newAdminData.lastName,
      birthdate: `${year}-${month}-${day}`,
      ssn: newAdminData.ssn,
      gender: newAdminData.gender,
      phone: newAdminData.phone,
      city: newAdminData.city,
      street: newAdminData.street,
      state: newAdminData.state,
      role: newAdminData.role,
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

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <section className="bg-white rounded-xl p-5 w-1/2">
          <h2 className="font-poppins text-2xl font-medium">
            Add New Admin
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
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
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
              <label htmlFor="subject" className="text-active">
                SSN
              </label>
              <input
                name="subject"
                id="subject"
                type="number"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleSSNChange}
              />
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="subject" className="text-active">
                Phone
              </label>
              <input
                name="subject"
                id="subject"
                type="number"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handlePhoneChange}
              />
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="subject" className="text-active">
                City
              </label>
              <input
                name="subject"
                id="subject"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleCityChange}
              />
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="subject" className="text-active">
                Street
              </label>
              <input
                name="subject"
                id="subject"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleStreetChange}
              />
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="subject" className="text-active">
                State
              </label>
              <input
                name="subject"
                id="subject"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleStateChange}
              />
            </form>
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white "
              onClick={handleAddNewAdmin}
            >
              Done
            </button>
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white "
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    )
  );
};

export default AddNewAdmin;
