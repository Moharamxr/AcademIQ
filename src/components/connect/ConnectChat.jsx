import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import Teacher1 from "../../assets/connect-teatcher (1).png";
import ThreeDots from "../../assets/icons/ThreeDots";
import ConnectChatMessage from "./ConnectChatMessage";
import SendMessageIcon from "../../assets/icons/SendMessageIcon";

const ConnectChatContainer = styled("section")({
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

const ConnectChat = () => {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  return (
    <ConnectChatContainer className="bg-white  rounded-2xl w-full md:w-8/12 overflow-hidden min-h-full hidden md:block">
      <FixedTopContent className="w-full between bg-white px-4 pe-6 py-3 border-b-gray-300 border-b-2 border-opacity-40 ">
        <div className="flex gap-2">
          <img src={Teacher1} alt="Teacher1" />
          <div className="flex flex-col gap-y-1 p-1">
            <p className="font-poppins font-normal text-xs sm:text-sm">
              Guy Hawkins
            </p>
            <div className="font-poppins text-xs text-slate-300 font-light ps-1">
              <div className="bg-green-500 w-1 h-1 relative top-1 right-1 rounded-full"></div>
              online
            </div>
          </div>
        </div>
        <div className="hover:shadow-slate-500 hover:shadow-2xl rounded-full ">
          <ThreeDots />
        </div>
      </FixedTopContent>
      <div className="w-full flex flex-col gap-1 pb-4   min-h-[28rem]">
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <ConnectChatMessage img={Teacher1} forward={true} />
        <ConnectChatMessage forward={false} />
        <div ref={bottomRef} />
      </div>
      <FixedBottomContent className="w-full between border-t-[1px] border-t-gray-400 border-opacity-40 px-4 py-2 bg-white">
        <textarea
          name="connectTextInp"
          id="connectTextInp"
          placeholder="Type a message"
          className="outline-none w-full overflow-hidden resize-none  h-10"
          style={{ resize: "none" }}
        />

        <SendMessageIcon />
      </FixedBottomContent>
    </ConnectChatContainer>
  );
};

export default ConnectChat;
