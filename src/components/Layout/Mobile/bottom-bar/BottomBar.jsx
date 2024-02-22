import styled from "@emotion/styled";
import React from "react";
import HomeIcon from "../../../../assets/icons/HomeIcon";
import ChildIcon from "../../../../assets/icons/ChildIcon";
import ConnectIcon from "../../../../assets/icons/ConnectIcon";
import ReportIcon from "../../../../assets/icons/ReportIcon";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

const FixedBottomContent = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const BottomBar = () => {
  const location = useLocation();
  const [activeChild, setActiveChild] = useState(false);
  const [activeConnect, setActiveConnect] = useState(false);
  const [activeReport, setActiveReport] = useState(false);
  const [activeHome, setActiveHome] = useState(false);


  useEffect(() => {
    const path = location.pathname;
    setActiveHome(path === "/");
    setActiveChild(path.includes("/child"));
    setActiveConnect(path.includes("/connect"));
    setActiveReport(path.includes("/report"));

  }, [location.pathname]);
  return (
    <FixedBottomContent className="bg-white container min-h-12  flex md:hidden px-2 gap-x-1 min-w-full">
      <NavLink
        to={"/"}
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
        to={"/child"}
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
