import React, { useState } from "react";
import { createGradeClass } from "../../../services/gradClass.service";

const AddNewClass = ({ isOpen, onClose, reservedClassRooms }) => {
  const [level, setLevel] = useState(1);
  const [classLetter, setClassLetter] = useState("A");
  const [classRoom, setClassRoom] = useState("Room 1");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };
  const handleClassLetterChange = (e) => {
    setClassLetter(e.target.value);
  };
  const handleClassRoomChange = (e) => {
    setClassRoom(e.target.value);
  };

  const handleCreateClass = async () => {
    console.log(level, classLetter, classRoom);
    const newData = {
      level: parseInt(level),
      letter: classLetter,
      room: classRoom,
    };

    setIsLoading(true);
    try {
      await createGradeClass(newData);
      setIsLoading(false);
      setError(null);
      onClose();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };
  const renderAvailableRooms = () => {
    const availableRooms = ["Room 1"];

    for (let i = 2; i <= 30; i++) {
      availableRooms.push("Room " + i);
    }
    return availableRooms.filter((room) => !reservedClassRooms.includes(room));
  };
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <section className="bg-white rounded-xl p-5 w-1/2">
          <h2 className="font-poppins text-2xl font-medium">Add New Class </h2>
          <span className="text-center text-red-500">{error && error}</span>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Level" className="text-active">
                Level
              </label>
              <select
                name="Level"
                id="Level"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleLevelChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </form>
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="classLetter" className="text-active">
                Class Letter
              </label>
              <select
                name="classLetter"
                id="classLetter"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleClassLetterChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </form>
          </div>
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="classRoom" className="text-active">
                Class Room
              </label>
              <select
                name="classRoom"
                id="classRoom"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleClassRoomChange}
              >
                {renderAvailableRooms().map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white "
              onClick={handleCreateClass}
              disabled={isLoading}
            >
              Done
            </button>
            <button
              className="w-64 bg-white border-active-br border-2 text-active rounded-lg p-3  text-center"
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

export default AddNewClass;
