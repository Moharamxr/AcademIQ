import React, { useEffect } from "react";
import Stu1 from "../../../assets/connect-teatcher (2).png";
import GrayAddImg from "../../../assets/GrayAddImg";
import AddNewAdmin from "./AddNewAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../services/user.service";
import { Skeleton } from "@mui/material";

const Admins = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getData();
  };
  const onOpen = () => setIsOpen(true);

  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers("admin");
      setIsLoading(false);
      setAdmins(data?.users);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
      {admins?.map((admin, index) => {
        return (
          <div
            key={index}
            className=" bg-white center flex-col p-4 gap-1 rounded-xl hover:bg-slate-50 hover:cursor-pointer overflow-hidden"
            onClick={() => navigate(`/admin/user/${admin._id}`)}
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
      {isLoading && <Skeleton variant="rounded" height={210} />}
      <div className=" bg-white center flex-col p-4 gap-10 rounded-xl">
        <GrayAddImg />
        <button
          className="bg-active text-white rounded-lg py-2 px-4"
          onClick={onOpen}
        >
          Add Admin
        </button>
      </div>
      <AddNewAdmin isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Admins;
