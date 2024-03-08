import React from "react";

const TeachersIcon = ({color}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_486_10231)">
        <path
          d="M14 23C14 23.552 13.552 24 13 24H1C0.448 24 0 23.552 0 23C0 19.134 3.134 16 7 16C10.866 16 14 19.134 14 23ZM7 6C4.791 6 3 7.791 3 10C3 12.209 4.791 14 7 14C9.209 14 11 12.209 11 10C11 7.791 9.209 6 7 6ZM24 5V13C24 15.761 21.761 18 19 18H14.474C13.529 16.594 12.199 15.467 10.635 14.773C12.072 13.677 13 11.947 13 10C13 6.686 10.314 4 7 4C5.916 4 4.898 4.288 4.021 4.791C4.133 2.133 6.315 0 9 0H19C21.761 0 24 2.239 24 5ZM20 15C20 14.447 19.552 14 19 14H15.5C14.948 14 14.5 14.447 14.5 15C14.5 15.553 14.948 16 15.5 16H19C19.552 16 20 15.553 20 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_486_10231">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TeachersIcon;
