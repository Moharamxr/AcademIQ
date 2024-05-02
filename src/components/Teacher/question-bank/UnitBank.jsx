import React, { useEffect, useRef } from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import styled from "@emotion/styled";
import { useState } from "react";
import { Skeleton } from "@mui/material";
import AddNewQuestion from "./AddNewQuestion";
import { useParams } from "react-router-dom";
import { getQuestionBankById } from "../../../services/questionBank.service";
import EditPen from "../../../assets/icons/EditPen";
import DeleteQIcon from "../../../assets/icons/DeleteQIcon";
import ViewQuestion from "./ViewQuestion";

const ListContainer = styled("div")({
  height: "38rem",
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

const DropdownMenu = styled.div`
  position: absolute;
  top: ${({ top }) => `${top + 25}px`};
  left: ${({ left }) => `${left - 40}px`};
  background-color: #fff;
  border-radius: 6px;
  z-index: 10;
`;

const UnitBank = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getData();
  };

  const onOpen = () => setIsOpen(true);
  const [viewQuestion, setViewQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(''); 
  const closeViewQuestion = () => setViewQuestion(false);
  const openViewQuestion = (id) => {
    setSelectedQuestion(id)
    setViewQuestion(true);
  }
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openedIndex, setOpenedIndex] = useState(null); 
  const dropdownRef = useRef(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getQuestionBankById(id);
      setQuestions(data?.questionBank?.questions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching grade courses: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropMenu = (index, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setOpenedIndex(index === openedIndex ? null : index);
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const closeDropMenu = () => {
    setOpenedIndex(null);
  };

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl ">Unit Bank</h2>
      </FixedTopContent>
      {!isLoading ? (
        Array.isArray(questions) &&
        questions.map((question, index) => (
          <div
            key={question._id}
            className="between py-3 border-2 border-gray-200/60 rounded-md px-6 hover:cursor-pointer hover:bg-gray-100"
            onClick={()=>openViewQuestion(question._id)}
          >
            <div className="flex items-center gap-5">
              {index + 1}
              <span className="text-gray-600 ">
                {question.text}
              </span>
            </div>
            <div
              className="cursor-pointer center flex-col gap-3"
              onClick={(e) => toggleDropMenu(index, e)}
              ref={dropdownRef}
            >
              <span>
                <ThreeDots />
              </span>
              {openedIndex === index && (
                <DropdownMenu top={menuPosition.top} left={menuPosition.left}>
                  <div className="flex flex-col divide-y-[0.5px] divide-gray-400 bg-gray-200/55 text-center rounded-md text-sm ">
                    <div className="flex gap-2 px-2 pt-3 pb-2 hover:bg-gray-300 rounded-t-md">
                      <EditPen /> <span className="font-medium">Edit</span>
                    </div>
                    <div className="flex gap-2 px-2 pb-3 pt-2 hover:bg-gray-300 rounded-b-md">
                      <DeleteQIcon /> <span className="font-medium">Delete</span>
                    </div>
                  </div>
                </DropdownMenu>
              )}
            </div>
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
          Add Class
        </button>
      </FixedBottomContent>
      <AddNewQuestion isOpen={isOpen} onClose={onClose} id={id} />
      <ViewQuestion isOpen={viewQuestion} onClose={closeViewQuestion} bankId={id} selectedQuestion={selectedQuestion} />
    </ListContainer>
  );
};

export default UnitBank;
