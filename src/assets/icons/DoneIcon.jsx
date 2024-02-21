import React from "react";

const DoneIcon = ({color}) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke={color?'rgba(38, 177, 112, 1)':'#595959'} />
      <path
        d="M11.6667 19.5L7 14.8191L8.63333 13.1809L11.6667 16.2234L19.3667 8.5L21 10.1383L11.6667 19.5Z"
        fill={color?'rgba(38, 177, 112, 1)':'#595959'}
      />
    </svg>
  );
};

export default DoneIcon;
