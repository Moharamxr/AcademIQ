import React from "react";
import { useDispatch } from "react-redux";
import { setActiveTab, setSelectedChat } from "../../store/slices/chatSlice";
import { createChat as createChatService } from "../../services/connect.service";

const ConnectListCard = ({ chat, active, closeSearch }) => {
  const chatTitle = chat?.type
    ? chat?.type === "private"
      ? `${chat?.member?.name?.first} ${chat?.member?.name?.last}`
      : chat?.title
    : `${chat?.name?.first} ${chat?.name?.last}`;
  const img = chat?.type
    ? chat?.type === "private"
      ? chat?.member?.profilePicture?.url
      : chat?.image
    : chat?.profilePicture?.url;

  function formatISODateToTime(isoDate) {
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
  }
  const createdAt = chat?.createdAt ? formatISODateToTime(chat.createdAt) : "";

  const dispatch = useDispatch();

  const handleSetSelectedChat = async () => {
    if (!chat?.type) {
      const data = {
        title: chatTitle,
        description: "description",
        members: [chat?._id],
      };
      const newChat = await createChatService(data);
      dispatch(setSelectedChat(newChat));
      if (window.innerWidth < 768) {
        dispatch(setActiveTab({ tab: "chat" }));
      }
      closeSearch();
    } else {
      dispatch(setSelectedChat({ chat }));
      if (window.innerWidth < 768) {
        dispatch(setActiveTab({ tab: "chat" }));
      }
    }
  };

  return (
    <div
      className={`w-full flex ${
        active
          ? "bg-blue-100/55 rounded-xl"
          : "bg-white border-b-slate-400 border-opacity-20 border-b-2"
      } p-2 py-1 gap-2 cursor-pointer`}
      onClick={handleSetSelectedChat}
    >
      {img ? (
        chat?.type === "group" ? (
          <div className="w-14 h-12 center rounded-full bg-gray-200 text-2xl flex items-center justify-center">
            {chat?.title
              .split(" ")
              .map((word) => word[0].toUpperCase())
              .join("")}
          </div>
        ) : (
          <img src={img} className="w-14 h-12 rounded-full" alt="Profile" />
        )
      ) : (
        <div
          className="w-14 h-12 bg-gray-200 center rounded-full text-2xl"
          style={{ backgroundColor: chat?.member?.profilePicture?.color }}
        >
          {chatTitle[0]?.toUpperCase()}
        </div>
      )}
      <div className="w-full flex flex-col gap-1 p-1 overflow-hidden">
        <div className="between">
          <p className="font-poppins font-medium text-base">{chatTitle}</p>
          <p className="font-poppins text-[9.5px] text-slate-500">
            {createdAt}
          </p>
        </div>
        <p className="text-xs text-gray-400 max-w-full overflow-hidden">
          {chat?.member?.email || chat?.email}
        </p>
        {/* {chat?.lastMessage && (
          <p className="font-poppins font-medium text-xs text-slate-500 max-w-full overflow-hidden">
            {chat.lastMessage[0]?.content || "No messages yet"}
          </p>
        )} */}

      </div>
    </div>
  );
};

export default ConnectListCard;
