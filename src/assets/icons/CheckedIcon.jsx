import React from "react";

const CheckedIcon = ({ checked }) => {
  return checked ? (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="27"
        height="27"
        rx="4.5"
        fill="#26B170"
        stroke="#26B170"
      />
      <path
        d="M4 12.0001L8.94975 16.9499L19.5563 6.34326"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(4, 4)"
      />
    </svg>
  ) : (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="27" height="27" rx="4.5" stroke="#26B170" />
    </svg>
  );
};

export default CheckedIcon;
