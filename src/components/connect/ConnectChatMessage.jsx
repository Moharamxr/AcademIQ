import React from "react";

const ConnectChatMessage = ({ content, forward, senderImage, createdAt }) => {
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
  return (
    <div className={`flex ${!forward && "flex-row-reverse"} gap-x-4 px-5 py-2`}>
      {/* <img src={forward?senderImage:localStorage.getItem('profilePicture')} className="w-1/12 h-1/6 pt-1" /> */}
      <div className={`container py-1 flex ${!forward && "flex-row-reverse"}`}>
        <div
          className={`font-poppins font-extralight leading-4 text-slate-800 text-sm  bg-blue-100/55 rounded-2xl ${
            forward ? "rounded-bl-none" : "rounded-br-none"
          } max-w-[fit-content] py-3 px-4 space-x-7`}
        >
          <span>{content}</span>
          <time
            className={`font-poppins text-[10px] text-slate-500 mt-2  `}
          >
            {formatISODateToTime(createdAt)}
          </time>{" "}
        </div>
      </div>
    </div>
  );
};

export default ConnectChatMessage;
