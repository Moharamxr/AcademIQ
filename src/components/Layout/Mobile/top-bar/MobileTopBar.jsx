import styled from "@emotion/styled";
import React, { useState } from "react";
import ThreeBarIcon from "../../../../assets/icons/ThreeBarIcon";
import Logo from "../../../../assets/Logo";
import NotificationIcon from "../../../../assets/icons/NotificationIcon";
import BurgerBar from "../burger/BurgerBar";
import NonThreeBarIcon from "../../../../assets/icons/NonThreeBarIcon";
import SearchIcon from "../../../../assets/icons/SearchIcon";

const FixedTopContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
`;

const MobileTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openBurger = () => {
    setIsOpen(!isOpen);
  };
  const closeBurger = () => {
    setIsOpen(false);
  };
  return (
    <>
      <FixedTopContent className="container between p-3 md:hidden bg-white min-w-full rounded">
        <div onClick={openBurger} className="cursor-pointer">
          {isOpen?<NonThreeBarIcon/>:<ThreeBarIcon />}
        </div>
        <div>
          <Logo />
        </div>
        <div className="pe-2">
          {/* <NotificationIcon /> */}
        </div>
      </FixedTopContent>
      
      <BurgerBar onClose={closeBurger} isOpen={isOpen} />
    </>
  );
};

export default MobileTopBar;
