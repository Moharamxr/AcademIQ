import React from "react";

const SendMessageIcon = ({active}) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"hover:shadow-sm hover:bg-gray-100 rounded-lg hover:cursor-pointer"}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.40221 6.67292C3.14221 4.33892 5.54521 2.62492 7.66821 3.63092L19.6122 9.28892C21.9002 10.3719 21.9002 13.6279 19.6122 14.7109L7.66821 20.3699C5.54521 21.3759 3.14321 19.6619 3.40221 17.3279L3.88221 12.9999H12.0002C12.2654 12.9999 12.5198 12.8946 12.7073 12.707C12.8949 12.5195 13.0002 12.2651 13.0002 11.9999C13.0002 11.7347 12.8949 11.4803 12.7073 11.2928C12.5198 11.1053 12.2654 10.9999 12.0002 10.9999H3.88321L3.40221 6.67292Z"
        fill={(active ? "rgb(59 130 246)" : "rgb(107 114 128)")}
      />
    </svg>
  );
};

export default SendMessageIcon;
