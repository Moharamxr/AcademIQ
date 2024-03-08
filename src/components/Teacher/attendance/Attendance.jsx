import styled from "@emotion/styled";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import SmCircle from "../../../assets/icons/SmCircle";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable";
import CheckedIcon from "../../../assets/icons/CheckedIcon";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TeacherGradesContainer = styled("div")({
  height: "31rem",
  width: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const CustomDateField = styled(DateField)`
  border-width: 1px;
  border-color: rgba(209, 213, 219, 0.7);
  border-radius: 0.375rem;
`;

const Attendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", checked: false },
    { id: 20, name: "Jane Smith", checked: true },
    { id: 30, name: "Alice Johnson", checked: false },
    { id: 10, name: "John Doe", checked: false },
    { id: 200, name: "Jane Smith", checked: true },
    { id: 300, name: "Alice Johnson", checked: false },
    { id: 100, name: "John Doe", checked: false },
    { id: 2000, name: "Jane Smith", checked: true },
    { id: 3000, name: "Alice Johnson", checked: false },
    { id: 1000, name: "John Doe", checked: false },
    { id: 20000, name: "Jane Smith", checked: true },
    { id: 30000, name: "Alice Johnson", checked: false },
    { id: 100000, name: "John Doe", checked: false },
    { id: 200000, name: "Jane Smith", checked: true },
    { id: 3000000, name: "Alice Johnson", checked: false },
  ]);
  const toggleCheck = (id) => {

    // setStudents 
  };
  return (
    <>
      <main className="w-full lg:w-8/12">
        <TeacherGradesContainer className="w-full bg-white rounded-xl">
          <FixedTopContent className="bg-white p-5 pb-0">
            <div className="between">
              <h3 className="font-poppins font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed md:leading-none text-gray-700">
                Attendance
              </h3>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomDateField
                  className="w-40"
                  defaultValue={dayjs("2022-04-17")}
                  format="LL"
                />
              </LocalizationProvider>
            </div>
            <div className="between pt-4 pb-1 border-b-2 border-gray-200/70">
              <span className="font-poppins font-normal text-base leading-7 text-active">
                Name
              </span>

              <div className="flex gap-5">
                <div className="center gap-1">
                  <SmCircle color={"#26B170"} />
                  <span>90% Attend</span>
                </div>
                <div className="center gap-1">
                  <SmCircle color={"#FE626B"} />
                  <span>10% Absent</span>
                </div>
              </div>
              <span className="font-poppins font-normal text-base leading-7 text-active">
                Status
              </span>
            </div>
          </FixedTopContent>
          <div className="flex flex-col py-4 gap-3 px-5">
            {students.map((student) => (
              <div
                key={student.id}
                className="between bg-gray-100 rounded-lg px-4 py-2"
              >
                <p>{student.name}</p>
                <button onClick={toggleCheck(student.id)}>
                  {student.checked ? (
                    <CheckedIcon checked={true} onClick={toggleCheck} />
                  ) : (
                    <CheckedIcon onClick={toggleCheck} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </TeacherGradesContainer>
        <div className="between pt-4">
            <button className="py-3  bg-active text-white rounded-lg w-36" >Select</button>
            <div className="flex gap-8">
                <button className="py-3  bg-transparent text-active border-2 border-active-br rounded-lg w-36">Select All</button>
            <button className="py-3  bg-transparent text-red-600 border-2 border-red-600 rounded-lg w-36">Remove All</button>
            </div>
            
        </div>
      </main>
      <aside className="w-full lg:w-4/12 hidden md:block">
        <ParentTimeTable />
      </aside>
    </>
  );
};

export default Attendance;
