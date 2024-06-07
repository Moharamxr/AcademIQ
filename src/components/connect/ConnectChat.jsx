import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import ThreeDots from "../../assets/icons/ThreeDots";
import ConnectChatMessage from "./ConnectChatMessage";
import SendMessageIcon from "../../assets/icons/SendMessageIcon";
import { getChatMessages, sendMessage } from "../../services/connect.service";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { BiLoader } from "react-icons/bi";

const ConnectChatContainer = styled("section")({
  display: "flex",
  flexDirection: "column",
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
  background-color: #ffffff;
  padding: 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ConnectChat = ({fetchChats}) => {
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const selectedChat = useSelector((state) => state.chatData.selectedChat);

  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageAttachment, setMessageAttachment] = useState(null);
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleAttachmentChange = (e) => {
    setMessageAttachment(e.target.files[0]);
  };

  const fetchChat = async () => {
    if (!selectedChat?._id) return;
    setChatLoading(true);
    try {
      const chatData = await getChatMessages(selectedChat._id);
      setMessages(chatData?.messages || []);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (bottomRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = bottomRef.current.offsetTop;
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`;
  };

  const chatTitle =
    selectedChat?.type === "private"
      ? `${selectedChat?.member?.name?.first} ${selectedChat?.member?.name?.last}`
      : selectedChat?.title;

  const handleSendMessage = async () => {
    if (!message ) return; // Check if either message or attachment exists
    setSendingMessage(true);

    try {
      const formData = new FormData();
      formData.append("content", message);
      if (messageAttachment) {
        formData.append("attachment", messageAttachment);
      }

      await sendMessage(selectedChat._id, formData);
      fetchChat();

      setMessage(""); // Clear message input after sending
      setMessageAttachment(null); // Clear attachment after sending
    } finally {
      setSendingMessage(false);
    }
  };

  // Function to resize textarea height based on its content
  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  // Resize textarea on initial load and whenever message changes
  useEffect(() => {
    resizeTextarea();
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  if (!selectedChat?._id) {
    return (
      <div className="w-full min-h-[36rem] center bg-white rounded-xl md:w-6/12 lg:w-8/12">
        No chat selected
      </div>
    );
  }

  return (
    <ConnectChatContainer
      ref={chatContainerRef}
      className="bg-white rounded-2xl w-full md:w-8/12 overflow-hidden"
    >
      <FixedTopContent className="w-full between bg-white px-4 pe-6 py-3 border-b-gray-300 border-b-2 border-opacity-40">
        <div className="flex gap-2">
          {(selectedChat?.type === "private" &&
            selectedChat?.member?.profilePicture?.url) ||
          (selectedChat?.type === "group" && selectedChat?.image) ? (
            <img
              src={
                selectedChat?.type === "private"
                  ? selectedChat?.member?.profilePicture?.url
                  : selectedChat?.image
              }
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div
              style={{
                backgroundColor: selectedChat?.member?.profilePicture?.color,
              }}
              className="w-12 h-12 center rounded-full text-2xl flex items-center justify-center"
            >
              {selectedChat?.type === "private"
                ? getInitials(
                    selectedChat?.member?.name?.first,
                    selectedChat?.member?.name?.last
                  )
                : selectedChat?.title[0]?.toUpperCase()}
            </div>
          )}
          <div className="flex flex-col gap-y-1 p-1">
            <p className="font-poppins font-normal text-xs sm:text-sm">
              {chatTitle}
            </p>
          </div>
        </div>
        <div className="hover:shadow-slate-500 hover:shadow-2xl rounded-full">
          <ThreeDots />
        </div>
      </FixedTopContent>
      <ConnectChatContainer className="w-full flex flex-col gap-1 pb-4 overflow-auto min-h-[26rem]">
        {chatLoading ? (
          Array.from(new Array(5)).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width="90%"
              height={60}
              className="mx-auto my-2"
            />
          ))
        ) : (
          <>
            {messages?.map((message) => (
              <ConnectChatMessage
                key={message._id}
                forward={message.sender._id !== localStorage.getItem("userId")}
                content={message.content}
                senderName={`${message.sender.name.first} ${message.sender.name.last}`}
                senderImage={message?.sender?.profilePicture?.url}
                createdAt={message.createdAt}
              />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </ConnectChatContainer>
      <FixedBottomContent className="w-full between border-t border-t-gray-400 border-opacity-40 px-4 py-2 pt-5 max-h-full ">
        <label htmlFor="file-upload" className="cursor-pointer">
          <AttachFileIcon />
          <input
            id="file-upload"
            type="file"
            onChange={handleAttachmentChange}
            className="hidden"
          />
        </label>
        <textarea
          ref={textareaRef}
          name="connectTextInp"
          id="connectTextInp"
          placeholder="Type a message"
          className="outline-none w-full overflow-hidden resize-none bg-active-bg rounded-lg p-2 h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 2xl:h-24 font-poppins font-normal text-xs sm:text-sm leading-6 text-gray-500"
          style={{ resize: "none", height: "1.5" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>
        {sendingMessage? <BiLoader /> :<SendMessageIcon />}
        </button>
      </FixedBottomContent>
    </ConnectChatContainer>
  );
};

export default ConnectChat;
