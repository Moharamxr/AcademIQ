import React from "react";

const ChildIcon = ({ active }) => {
  const color = !active ? "rgba(148, 163, 184, 1)" : "rgba(0, 118, 158, 1)";
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.217 1.50045C12.5242 1.17159 11.7669 1.00098 11 1.00098C10.2331 1.00098 9.47581 1.17159 8.783 1.50045L2.092 4.63745C0.636 5.31945 0.636 7.68145 2.092 8.36345L8.782 11.5005C9.47494 11.8295 10.2324 12.0002 10.9995 12.0002C11.7666 12.0002 12.5241 11.8295 13.217 11.5005L19.908 8.36345C21.364 7.68145 21.364 5.31945 19.908 4.63745L13.217 1.50045ZM21 6.50045V11.5005V6.50045Z"
        fill={color }
      />
      <path
        d="M21 6.50045V11.5005M13.217 1.50045C12.5242 1.17159 11.7669 1.00098 11 1.00098C10.2331 1.00098 9.47581 1.17159 8.783 1.50045L2.092 4.63745C0.636 5.31945 0.636 7.68145 2.092 8.36345L8.782 11.5005C9.47494 11.8295 10.2324 12.0002 10.9995 12.0002C11.7666 12.0002 12.5241 11.8295 13.217 11.5005L19.908 8.36345C21.364 7.68145 21.364 5.31945 19.908 4.63745L13.217 1.50045Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 9.5V14.625C4 17.543 8.694 19 11 19C13.306 19 18 17.543 18 14.625V9.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChildIcon;
