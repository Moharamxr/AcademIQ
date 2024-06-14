import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import ThreeDots from "../../assets/icons/ThreeDots";
import ConnectChatMessage from "./ConnectChatMessage";
import SendMessageIcon from "../../assets/icons/SendMessageIcon";
import {
  getChatMessages,
  sendMessage,
  socket,
} from "../../services/connect.service";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { BiLoader } from "react-icons/bi";

const ConnectChatContainer = styled("section")({
  display: "flex",
  flexDirection: "column",
  height: "85vh",
  minHeight: "24rem",
  overflow: "hidden",
  position: "relative",
});

const ChatContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  max-height: calc(85vh - 7rem); /* Adjust the max-height calculation */
  padding: 0 1rem; /* Add padding to ensure content doesn't stick to edges */

  /* Styling the scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: lightGray;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkGray; /* Color of the scrollbar thumb */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: gray; /* Color of the scrollbar thumb on hover */
  }
`;

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
  background-color: #ffffff;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const ConnectChat = () => {
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
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const handleNewMessage = (data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: data.content,
        sender: data.sender,
        createdAt: data?.createdAt,
      },
    ]);
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "";
    return `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`;
  };

  const chatTitle =
    selectedChat?.type === "private"
      ? `${selectedChat?.member?.name?.first} ${selectedChat?.member?.name?.last}`
      : selectedChat?.title;

  const handleSendMessage = async () => {
    if (!message) return;
    setSendingMessage(true);

    try {
      const formData = new FormData();
      formData.append("content", message);
      if (messageAttachment) {
        formData.append("attachment", messageAttachment);
      }

      socket.emit("sendMessage", {
        content: message,
        chatId: selectedChat._id,
      });
      await sendMessage(selectedChat._id, formData);

      setMessage("");
      setMessageAttachment(null);
    } finally {
      setSendingMessage(false);
    }
  };

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  if (!selectedChat?._id) {
    return (
      <div className="w-full min-h-[85vh] center bg-white rounded-xl md:w-6/12 lg:w-8/12">
        No chat selected
      </div>
    );
  }

  return (
    <ConnectChatContainer className="bg-white rounded-2xl w-full md:w-8/12">
      <FixedTopContent className="w-full between bg-white px-4 pe-6 py-3 border-b-gray-300 border-b-2 border-opacity-40">
        <div className="flex gap-2">
          {(selectedChat?.type === "private" &&
            selectedChat?.member?.profilePicture?.url) ||
          (selectedChat?.type === "group" && selectedChat?.image) ? (
            // <img
            //   src={
            //     selectedChat?.type === "private"
            //       ? selectedChat?.member?.profilePicture?.url
            //       : selectedChat?.image
            //   }
            //   alt="Profile"
            //   className="w-12 h-12 rounded-full"
            // />
            <div
              
              className="w-12 h-12 center rounded-full bg-active text-white text-2xl flex items-center justify-center"
            >
              {selectedChat?.type === "private"
                ? getInitials(
                    selectedChat?.title
                  )
                : selectedChat?.title.split(" ").map((word) => word[0].toUpperCase()).join("")}
            </div>
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
            <p className="font-poppins font-medium text-base  sm:text-sm">
              {chatTitle}
            </p>
          </div>
        </div>
      </FixedTopContent>
      <ChatContainer
        className="w-full flex flex-col gap-1 overflow-auto"
        ref={chatContainerRef}
      >
        {!chatLoading &&
          messages?.map((message, index) => (
            <ConnectChatMessage
              key={message._id || message.content + index}
              forward={message.sender._id !== localStorage.getItem("userId")}
              content={message.content}
              senderName={`${message.sender.name.first} ${message.sender.name.last}`}
              senderImage={message?.sender?.profilePicture?.url}
              createdAt={message.createdAt}
            />
          ))}
      </ChatContainer>
      <FixedBottomContent
        className="w-full between gap-2 border-t border-t-gray-400 border-opacity-40 px-4 py-2 pt-5  pb-3 max-h-32  "
        ref={bottomRef}
      >
        <Badge
          badgeContent={messageAttachment ? "1" : 0}
          color="error"
          className={messageAttachment ? "absolute top-0 right-0" : "hidden"}
        >
          <label htmlFor="file-upload" className="cursor-pointer">
            <AttachFileIcon />
            <input
              id="file-upload"
              type="file"
              onChange={handleAttachmentChange}
              className="hidden"
            />
          </label>
        </Badge>
        <textarea
          ref={textareaRef}
          name="connectTextInp"
          id="connectTextInp"
          placeholder="Type a message"
          className="outline-none w-full overflow-hidden resize-none bg-active-bg rounded-lg p-2 h-10 max-h-28  font-poppins font-normal text-xs sm:text-sm leading-6 text-gray-700"
          style={{ resize: "none", height: "40px" }} // Adjusted minHeight for better visibility
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="outline-none">
          {sendingMessage ? <BiLoader /> : <SendMessageIcon active={message} />}
        </button>
      </FixedBottomContent>
    </ConnectChatContainer>
  );
};

export default ConnectChat;
