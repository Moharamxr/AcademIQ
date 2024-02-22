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
          <NotificationIcon />
        </div>
      </FixedTopContent>
      <div className="bg-white py-2 px-4 w-full mb-0 block md:hidden">
        <div className="between bg-gray-100 rounded-2xl p-1 gap-x-3 ps-3">
          <SearchIcon />
          <input type="text" name="mobileSearch" id="mobileSearch" placeholder="Search here" className="bg-gray-100 w-full outline-none" />
        </div>
      </div>
      <BurgerBar onClose={closeBurger} isOpen={isOpen} />
    </>
  );
};

export default MobileTopBar;
