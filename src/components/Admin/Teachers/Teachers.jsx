import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import AddNewTeacher from "./AddNewTeacher";
import { getUsers } from "../../../services/user.service";

const ListContainer = styled("div")({
  height: "90vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "lightgray",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
});

const FixedTopContent = styled("div")`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
`;

const FixedBottomContent = styled("div")`
  position: sticky;
  bottom: 0;
  z-index: 1;
  background-color: white;
`;

const Teachers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers("teacher");
      setTeachers(data?.users);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onClose = () => {
    setIsOpen(false);
    getData();
  };

  const onOpen = () => setIsOpen(true);

  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl">
      <FixedTopContent className="between py-5">
        <h2 className="text-2xl">Teachers</h2>
        {/* Uncomment and modify if a select dropdown is needed */}
        {/* <select name="" id="" className="bg-gray-100 rounded-lg p-3 outline-none">
          <option value="">Class 1</option>
        </select> */}
      </FixedTopContent>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {!isLoading ? (
          teachers?.map((teacher, index) => (
            <div
              key={index}
              className="bg-active-bg border-2 border-blue-200 center flex-col p-4 gap-1 rounded-xl hover:bg-slate-50 hover:cursor-pointer overflow-hidden"
              onClick={() => navigate(`/admin/user/${teacher._id}`)}
            >
              {teacher?.profilePicture?.url ? (
                <img
                  src={teacher?.profilePicture?.url}
                  alt="profile-Pic"
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div
                  className="w-16 h-16 text-white text-2xl rounded-full center mr-2 select-none"
                  style={{ backgroundColor: teacher?.profilePicture?.color }}
                >
                  {teacher?.name?.first.charAt(0).toUpperCase() +
                    teacher?.name?.last.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-center text-gray-900 font-poppins font-medium">
                {teacher?.name?.first + " " + teacher?.name?.last}
              </span>
              <span className="text-center text-gray-500 font-poppins text-sm">
                {teacher?.email}
              </span>
            </div>
          ))
        ) : (
          Array.from(new Array(8)).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={180} />
          ))
        )}
      </div>
      <FixedBottomContent className="py-5 flex flex-row-reverse">
        <button className="bg-active text-white rounded-lg py-3 px-6" onClick={onOpen}>
          Add Teacher
        </button>
      </FixedBottomContent>
      <AddNewTeacher isOpen={isOpen} onClose={onClose} />
    </ListContainer>
  );
};

export default Teachers;
