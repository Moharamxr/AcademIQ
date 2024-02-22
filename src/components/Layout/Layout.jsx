import React from "react";
import Sidebar from "./sidebar/Sidebar";
import ParentTimeTable from "./timeTables/parentTimeTable/ParentTimeTable";
import TopBar from "./top-bar/TopBar";
import BottomBar from "./Mobile/bottom-bar/BottomBar";
import MobileTopBar from "./Mobile/top-bar/MobileTopBar";

const Layout = (props) => {
  return (
    <div className="flex flex-wrap w-full md:p-6 p-0  pt-14 md:pb-4 md:pt-6 pb-12">
      <MobileTopBar/>
      <div className="hidden  md:block w-1/6 ">
        <Sidebar />
      </div>

      <div className="w-full lg:w-5/6 md:w-5/6 lg:pl-3 xl:pl-0 md:pl-16 pl-0 ">
        <div className=" flex-shrink-0 overflow-hidden  pt-0 hidden md:block">
         <TopBar/>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-4">
        {props.children}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default Layout;
