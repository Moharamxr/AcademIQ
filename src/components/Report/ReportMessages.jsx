import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Teacher1 from "../../assets/connect-teatcher (1).png";
import ThreeDots from "../../assets/icons/ThreeDots";
import ReportMessageCard from "./ReportMessageCard";
import SendMessageIcon from "../../assets/icons/SendMessageIcon";
import Trash from "../../assets/icons/Trash";
import ShareIcon from "../../assets/icons/ShareIcon";
import OpenFolder from "../../assets/icons/OpenFolder";
import EditIcon from "../../assets/icons/EditIcon";
import { useDispatch, useSelector } from "react-redux";
import { setToggleNewMessage } from "../../store/slices/reportsSlice";

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

const ReportMessages = ({ report, loading }) => {
  const role = localStorage.getItem("role");
  const selectedContact = useSelector(
    (state) => state.reportsData.selectedContact
  );
  const showMessage = useSelector(
    (state) => state.reportsData.toggleNewMessage
  );

  const [initials, setInitials] = useState("");
  useEffect(() => {
    const firstName = selectedContact?.name?.first;
    const lastName = selectedContact?.name?.last;
    const initials =
      (firstName?.charAt(0).toUpperCase() || "") +
      (lastName?.charAt(0).toUpperCase() || "");
    setInitials(initials);
  }, [selectedContact]);

  const dispatch = useDispatch();
  const handleOpenAddMessage = () => {
    dispatch(setToggleNewMessage({ toggleNewMessage: true }));
  };

  const isRender = () => {
    if (role == 'admin') {
      return selectedContact?.name;

    } else {
      return selectedContact && report;
    }
  }
  return (
    <ConnectChatContainer
      className={`bg-white ${
        showMessage && "hidden"
      } rounded-2xl w-full md:w-8/12 overflow-hidden`}
    >
      <FixedTopContent className="w-full between bg-white px-4 pe-6 py-3 border-b-gray-300 border-b-2 border-opacity-40 ">
        <div className="flex gap-2">
          {selectedContact?.profilePicture?.url ? (
            <img
              src={selectedContact?.profilePicture?.url}
              alt="profile-pic"
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div
              className={`w-14 h-14 bg-[${
                selectedContact?.profilePicture?.color
              }] ${
                !selectedContact && "bg-white"
              }  text-white text-2xl rounded-full center select-none cursor-pointer`}
              style={{
                backgroundColor: selectedContact?.profilePicture?.color,
              }}
            >
              {initials}
            </div>
          )}
          <div className="flex flex-col gap-y-1 p-1">
            <p className="font-poppins font-normal text-xs sm:text-sm">
              {selectedContact?.name?.first} {selectedContact?.name?.last} {selectedContact?.to}
            </p>
            <p className="font-poppins font-light text-xs text-gray-400">
              {selectedContact?.email}
            </p>
          </div>
        </div>
        {/* <p className="font-poppins font-light text-xs  text-gray-400">
          31 / 07 / 2020
        </p> */}
        {isRender() && (
          <span onClick={handleOpenAddMessage}>
            <EditIcon />
          </span>
        )}
      </FixedTopContent>
      <div className="w-full flex flex-col gap-1 pb-4 min-h-[28rem]">
        {isRender() && (
          <ReportMessageCard
            key={report?._id}
            img={Teacher1}
            forward={false}
            report={report}
          />
        )}

        {/* <ReportMessageCard img={Teacher1} forward={true} /> */}
      </div>
      {/* {selectedContact && (
        <FixedBottomContent className="w-full flex justify-around items-center border-t-[1px] border-t-gray-400 border-opacity-40 px-4 py-2 bg-white">
          <Trash />
          <ShareIcon />

          <OpenFolder />

          <span onClick={handleOpenAddMessage}>
            <EditIcon />
          </span>
        </FixedBottomContent>
      )} */}
    </ConnectChatContainer>
  );
};

export default ReportMessages;
