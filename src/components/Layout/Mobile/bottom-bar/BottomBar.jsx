import styled from "@emotion/styled";
import React from "react";
import HomeIcon from "../../../../assets/icons/HomeIcon";
import ChildIcon from "../../../../assets/icons/ChildIcon";
import ConnectIcon from "../../../../assets/icons/ConnectIcon";
import ReportIcon from "../../../../assets/icons/ReportIcon";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const FixedBottomContent = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 10;
`;

const BottomBar = () => {
  const [path,setPath] = useState(location.pathname);
  const [activeChild, setActiveChild] = useState(path.includes("/child"));
  const [activeConnect, setActiveConnect] = useState(path.includes("/connect"));
  const [activeReport, setActiveReport] = useState(path.includes("/report"));
  const [activeHome, setActiveHome] = useState(path==="/");
  const handleHomeClick = () => {
    setActiveHome(!activeHome);
    setActiveChild(false);
    setActiveConnect(false);
    setActiveReport(false);
  };
  const handleChildClick = () => {
    setActiveChild(!activeChild);
    setActiveConnect(false);
    setActiveReport(false);
    setActiveHome(false);
  };

  const handleConnectClick = () => {
    setActiveConnect(!activeConnect);
    setActiveChild(false);
    setActiveReport(false);
    setActiveHome(false);
  };

  const handleReportClick = () => {
    setActiveReport(!activeReport);
    setActiveChild(false);
    setActiveConnect(false);
    setActiveHome(false);
  };
  return (
    <FixedBottomContent className="bg-white container min-h-12  flex md:hidden px-2 gap-x-1 min-w-full">
      <NavLink
        to={"/"}
        onClick={handleHomeClick}
        className={`w-1/4 p-2  border-t-4 ${
          activeHome && "border-t-active-br"
        } flex flex-col rounded-sm items-center`}
      >
        <HomeIcon active={activeHome} />
        <p
          className={`font-poppins text-sm leading-6 tracking-normal text-left ${
            activeHome ? "text-active" : "text-default"
          } `}
        >
          Home
        </p>
      </NavLink>
      <NavLink
        to={"/"}
        onClick={handleChildClick}
        className={`w-1/4 p-2  border-t-4 ${
          activeChild && "border-t-active-br"
        } flex flex-col rounded-sm items-center`}
      >
        <ChildIcon active={activeChild} />
        <p
          className={`font-poppins text-sm leading-6 tracking-normal text-left ${
            activeChild ? "text-active" : "text-default h-1"
          } `}
        >
          Child
        </p>
      </NavLink>
      <NavLink
        to={"/connect"}
        onClick={handleConnectClick}
        className={`w-1/4 p-2  border-t-4 ${
          activeConnect && "border-t-active-br"
        } flex flex-col rounded-sm items-center`}
      >
        <ConnectIcon active={activeConnect} />
        <p
          className={`font-poppins text-sm leading-6 tracking-normal text-left ${
            activeConnect ? "text-active" : "text-default "
          }`}
        >
          Connect
        </p>
      </NavLink>
      <NavLink
        to={"/report"}
        onClick={handleReportClick}
        className={`w-1/4 p-2  border-t-4 ${
          activeReport && "border-t-active-br"
        } flex flex-col rounded-sm items-center`}
      >
        <ReportIcon active={activeReport} />
        <p
          className={`font-poppins text-sm leading-6 tracking-normal text-left ${
            activeReport ? "text-active" : "text-default "
          }`}
        >
          Report
        </p>
      </NavLink>
    </FixedBottomContent>
  );
};

export default BottomBar;
