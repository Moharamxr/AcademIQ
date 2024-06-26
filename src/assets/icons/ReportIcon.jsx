import React from "react";

const ReportIcon = ({ active }) => {
  const color = !active ? "rgba(148, 163, 184, 1)" : "rgba(0, 118, 158, 1)";
  return (
    <svg
      className="ms-1 mt-1"
      width="19"
      height="19"
      viewBox="0 0 22 22"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 6L10 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6ZM5 17H3V8H5V17ZM9 17H7V11H9V17ZM13 17H11V14H13V17ZM10 7H9V2L14 7H10Z"
        fill={color}
      />
    </svg>
  );
};

export default ReportIcon;
