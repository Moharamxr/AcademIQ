import React from "react";
import styled from "@emotion/styled";
import Teacher1 from "../../assets/connect-teatcher (1).png";
import ThreeDots from "../../assets/icons/ThreeDots";
import ReportMessageCard from "./ReportMessageCard";
import SendMessageIcon from "../../assets/icons/SendMessageIcon";
import Trash from "../../assets/icons/Trash";
import ShareIcon from "../../assets/icons/ShareIcon";
import OpenFolder from "../../assets/icons/OpenFolder";
import EditIcon from "../../assets/icons/EditIcon";

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

const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const ReportMessages = () => {
  return (
    <ConnectChatContainer className="bg-white container rounded-2xl w-full md:w-8/12 overflow-hidden">
      <FixedTopContent className="container between bg-white px-4 pe-6 py-3 border-b-gray-300 border-b-2 border-opacity-40 ">
        <div className="flex gap-2">
          <img src={Teacher1} alt="Teacher1" />
          <div className="flex flex-col gap-y-1 p-1">
            <p className="font-poppins font-normal text-xs sm:text-sm">
              Guy Hawkins
            </p>
            <p className="font-poppins text-xs  font-light ps-1">
              To:
              <span className="text-gray-400 font-poppins font-extralight text-[10px]">
                Cooper Leslie
              </span>
            </p>
          </div>
        </div>
        <p className="font-poppins font-light text-xs  text-gray-400">
          31 / 07 / 2020
        </p>
      </FixedTopContent>
      <div className="container flex flex-col gap-1 pb-4 min-h-[28rem]">
        <ReportMessageCard img={Teacher1} forward={true} />
      </div>
      <FixedBottomContent className="container flex justify-around items-center border-t-[1px] border-t-gray-400 border-opacity-40 px-4 py-2 bg-white">
        <Trash />
        <ShareIcon />
        <OpenFolder />
        <EditIcon />
      </FixedBottomContent>
    </ConnectChatContainer>
  );
};

export default ReportMessages;
