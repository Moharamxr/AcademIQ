import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { setToggleNewMessage } from "../../store/slices/reportsSlice";
import EditIcon from "../../assets/icons/EditIcon";
import ReportMessageCard from "./ReportMessageCard";

const ConnectChatContainer = styled("div")({
  height: "36rem",
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

const ReportMessages = () => {
  const role = localStorage.getItem("role");
  const selectedReport = useSelector(
    (state) => state.reportsData.selectedReport
  );
  const isSent = useSelector((state) => state.reportsData.isSent);
  const dispatch = useDispatch();

  const contact = isSent ? selectedReport?.to : selectedReport?.from;

  const handleOpenAddMessage = () => {
    dispatch(setToggleNewMessage({ toggleNewMessage: true }));
  };

  const initials =
    contact?.name?.first && contact?.name?.last
      ? `${contact.name.first[0]}${contact.name.last[0]}`
      : "";

  return selectedReport ? (
    <ConnectChatContainer
      className={`bg-white ${
        !selectedReport ? "hidden" : ""
      } rounded-2xl w-full md:w-8/12 overflow-hidden`}
    >
      <FixedTopContent className="w-full between bg-white px-4 pe-6 py-3 border-b-gray-300 border-b-2 border-opacity-40">
        <div className="flex gap-2">
          {contact?.profilePicture?.url ? (
            <img
              src={contact.profilePicture.url}
              alt="profile-pic"
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div
              className={`w-14 h-14 bg-${
                contact?.profilePicture?.color || "white"
              } text-white text-2xl rounded-full center select-none cursor-pointer`}
              style={{ backgroundColor: contact?.profilePicture?.color }}
            >
              {initials}
            </div>
          )}
          <div className="flex flex-col gap-y- p-1">
            <p className="font-poppins font-normal text-xs sm:text-sm">
              {contact?.name?.first} {contact?.name?.last}
            </p>
            <p className="font-poppins font-light text-xs text-gray-400">
              {contact?.email}
            </p>
         
             
         
          </div>
        </div>
        {selectedReport?.body && role !== "parent" && (
          <span onClick={handleOpenAddMessage}>
            <EditIcon />
          </span>
        )}
      </FixedTopContent>
      {selectedReport && (
        <div className="w-full flex flex-col gap-1 pb-4 min-h-[28rem]">
          <ReportMessageCard
            key={selectedReport._id}
            forward={
              selectedReport?.from?._id === localStorage.getItem("userId")
            }
            report={selectedReport}
          />
        </div>
      )}
    </ConnectChatContainer>
  ) : null;
};

export default ReportMessages;
