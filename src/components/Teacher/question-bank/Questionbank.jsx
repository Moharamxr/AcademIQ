import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { getGradeCourses } from "../../../services/courses.service";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddNewBank from "./AddNewBank";
import AddPostIcon from "../../../assets/icons/AddPostIcon";
import { getQuestionBanks } from "../../../services/questionBank.service";
const ListContainer = styled("div")({
  height: "85vh",
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
const Questionbank = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getBanks();
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  const levels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const [selectedLevel, setSelectedLevel] = useState("");
  const [questionBanks, setQuestionBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [gradeCourses, setGradeCourses] = useState([]);

  const handleLevelChange = (e) => {
    setSelectedLevel(parseInt(e.target.value));
  };
  const getCourses = async () => {
    try {
      const coursesData = await getGradeCourses();
      setGradeCourses(coursesData.courses);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  const getBanks = async () => {
    setIsLoading(true);
    try {
      if (selectedLevel === "") {
        const questionBankData = await getQuestionBanks();
        setQuestionBanks(questionBankData.questionBanks);
      } else {
        const questionBankData = await getQuestionBanks(selectedLevel);
        setQuestionBanks(questionBankData.questionBanks);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching question banks: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBanks();
  }, [selectedLevel]);

  const navigateToUnit = (id) => {
    navigate(`unit/${id}`);
  };

  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl ">Questionbank</h2>

        <select
          name="grades"
          id="grades"
          className="border-2 border-gray-100 bg-white rounded-lg p-3 outline-none"
          onChange={handleLevelChange}
          value={selectedLevel}
        >
          <option value={0}>Select Grade</option>
          {levels.map((level, index) => (
            <option key={index} value={level}>
              Grade {level}
            </option>
          ))}
        </select>
      </FixedTopContent>
      <button
        className={`between w-56 gap-x-3 border-[1px] border-active-br  p-2 px-3 rounded-xl`}
        onClick={onOpen}
      >
        <div className={` flex-shrink-0`}>
          <AddPostIcon className={`w-5 h-5`} />
        </div>
        <div
          className={`font-poppins text-sm font-normal leading-6 tracking-normal`}
        >
          Create question bank
        </div>
      </button>
      {!isLoading ? (
        Array.isArray(questionBanks) &&
        questionBanks.map((bank, index) => (
          <div
            key={bank._id}
            className="between py-3 border-2 border-gray-200/60 rounded-md px-3 hover:bg-slate-100 hover:cursor-pointer"
            onClick={() => navigateToUnit(bank._id)}
          >
            <span>{bank.title}</span>
            <span className="text-sm text-gray-400">
              {bank.questions?.length > 0
                ? `${bank.questions.length} question${
                    bank.questions.length !== 1 ? "s" : ""
                  }`
                : ""}
            </span>
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

      {
        questionBanks.length === 0 && !isLoading && (
          <div className="center w-full h-full">
            <h3 className="text-gray-500">No question banks available</h3>
          </div>
        )
      
      }

      <AddNewBank
        isOpen={isOpen}
        onClose={onClose}
        gradeCourses={gradeCourses}
      />
    </ListContainer>
  );
};

export default Questionbank;
