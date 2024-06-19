import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import Button from "@mui/material/Button";
import { getChatMessageWithAttachment } from "../../services/connect.service";
import { useSelector } from "react-redux";

const ConnectChatMessage = ({
  content,
  forward,
  senderImage,
  createdAt,
  attachment,
  id,
}) => {
  // Function to format ISO date to readable time format
  const formatISODateToTime = (isoDate) => {
    const date = new Date(isoDate);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Determine message alignment based on forward status
  const messageAlignment = forward ? "flex-row" : "flex-row-reverse";
  // Determine message bubble styles based on forward status
  const messageStyles = forward
    ? "rounded-bl-none bg-blue-300/70"
    : "rounded-br-none bg-blue-100/55";

  const selectedChat = useSelector((state) => state.chatData.selectedChat);
  const [img, setImg] = useState("");

  const fetchAttachment = async () => {
    try {
      const response = await getChatMessageWithAttachment(
        selectedChat?._id,
        id
      );
      const data = await response.message.attachment;
      // setImg(data);
      window.open(data);
    } catch (error) {
      console.error("Error fetching attachment: ", error);
      // Handle error gracefully (e.g., show a notification)
    }
  };

  return (
    <div>
      <div className={`flex ${messageAlignment} gap-x-4 px-5 py-2 items-start`}>
        {/* Render sender image (if available) */}
        {/* {senderImage && (
          <img
            src={senderImage}
            alt="Sender"
            className="w-12 h-12 rounded-full"
          />
        )} */}
        <div
          className={`container py-1 flex ${!forward && "flex-row-reverse"}`}
        >
          <div
            className={`font-poppins flex font-extralight leading-4 text-slate-800 text-sm rounded-2xl ${messageStyles} max-w-[fit-content] py-3 px-4 space-x-7`}
          >
            <p className="pt-1 max-w-52  break-words">
              {content}
            </p>

            {img && <img src={img} className="w-20 h-20 rounded mt-5" />}

            <div className="font-poppins text-[10px] text-slate-500 mt-2">
              {formatISODateToTime(createdAt)}
            </div>
          </div>
          {/* Render attachment if available */}
          {attachment && !img && (
            <div className="mt-2 mx-2">
              <Button
                variant="outlined"
                startIcon={<ImageIcon />}
                onClick={fetchAttachment}
              >
                View Image
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row-reverse pe-5"></div>
    </div>
  );
};

export default ConnectChatMessage;
