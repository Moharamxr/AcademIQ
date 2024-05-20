import React, { useEffect } from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import Stu1 from "../../../assets/connect-teatcher (2).png";
import styled from "@emotion/styled";
import AddNewStudent from "./AddNewStudent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../services/user.service";
import { Skeleton } from "@mui/material";
const ListContainer = styled("div")({
  maxHeight: "38rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});
const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;
const Students = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getData();
  };
  const onOpen = () => setIsOpen(true);

  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers("student");
      setIsLoading(false);
      setStudents(data?.users);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl">Students</h2>
        {/* <select
          name=""
          id=""
          className="bg-gray-100 rounded-lg p-3 outline-none"
        >
          <option value="">Class 1</option>
        </select> */}
      </FixedTopContent>
      {!isLoading ? (
        students?.map((student, index) => (
          <div
            key={student._id}
            className="between py-3  border-2 border-gray-200/60 rounded-md px-6 hover:bg-slate-100 hover:cursor-pointer"
            onClick={() => navigate(`/admin/user/${student._id}`)}
          >
            <div className="flex items-center gap-5">
              <span className="">{index + 1}</span>
              <img src={Stu1} alt="" className="w-9 h-9" />
              <p className="font-poppins font-medium">{student.username}</p>
            </div>
            {/* <span className="cursor-pointer   ">
              <ThreeDots />
            </span> */}
          </div>
        ))
      ) : (
        <>
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
        </>
      )}
      <FixedBottomContent className="bg-white py-5 flex flex-row-reverse">
        <button
          className="bg-active text-white rounded-lg py-3 px-6"
          onClick={onOpen}
        >
          Add Student
        </button>
      </FixedBottomContent>
      <AddNewStudent isOpen={isOpen} onClose={onClose} />
    </ListContainer>
  );
};

export default Students;
