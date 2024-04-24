import React, { useEffect } from "react";
import Stu1 from "../../../assets/connect-teatcher (2).png";
import GrayAddImg from "../../../assets/GrayAddImg";
import AddNewAdmin from "./AddNewAdmin";
import { useState } from "react";
import { getUsers } from "../../../services/admin.service";

const Admins = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {setIsOpen(false);getData();}
  const onOpen = () => setIsOpen(true);
  
  const [admins, setAdmins] = useState([]);

  const getData = async () => {
    try {
      const data = await getUsers('admin');
      setAdmins(data.users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
      {admins.map((admin, index) => {
        return (
          <div
            key={index}
            className=" bg-white center flex-col p-4 gap-1 rounded-xl"
          >
            <img src={Stu1} alt="" />
            <span className="text-center text-gray-900 font-poppins font-medium">
              {admin.username}
            </span>
            <span className="text-center text-gray-500 font-poppins text-sm">
              {admin.userId}
            </span>
            <span className="text-center text-gray-500 font-poppins text-sm">
              {admin.email}
            </span>
            <button className="bg-active text-white rounded-lg py-2 px-4">
              View Profile
            </button>
          </div>
        );
      })}
      <div className=" bg-white center flex-col p-4 gap-10 rounded-xl">
        <GrayAddImg/>
        <button className="bg-active text-white rounded-lg py-2 px-4"onClick={onOpen}>
              Add Admin
            </button>
      </div>
      <AddNewAdmin isOpen={isOpen} onClose={onClose} />

    </div>
  );
};

export default Admins;
