import React from "react";
import Stu1 from "../../../assets/connect-teatcher (2).png";
import GrayAddImg from "../../../assets/GrayAddImg";
import AddNewAdmin from "./AddNewAdmin";
import { useState } from "react";

const Admins = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const admins = [
    {
      name: "Renada Ahmed",
      email: "renadaahmed@gmail.com",
      phone: "010234567889",
    },
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "1234567890",
    },
    {
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      phone: "0987654321",
    },
    {
      name: "Michael Johnson",
      email: "michaeljohnson@gmail.com",
      phone: "9876543210",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@gmail.com",
      phone: "0123456789",
    },
    {
      name: "David Wilson",
      email: "davidwilson@gmail.com",
      phone: "6789012345",
    },
  ];
  return (
    <main className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
      {admins.map((admin, index) => {
        return (
          <div
            key={index}
            className=" bg-white center flex-col p-4 gap-1 rounded-xl"
          >
            <img src={Stu1} alt="" />
            <span className="text-center text-gray-900 font-poppins font-medium">
              {admin.name}
            </span>
            <span className="text-center text-gray-500 font-poppins text-sm">
              {admin.email}
            </span>
            <span className="text-center text-gray-500 font-poppins text-sm">
              {admin.phone}
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

    </main>
  );
};

export default Admins;
