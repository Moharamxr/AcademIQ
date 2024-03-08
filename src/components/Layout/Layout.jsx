import React from "react";
import Sidebar from "./sidebar/Sidebar";
import TopBar from "./top-bar/TopBar";
import BottomBar from "./Mobile/bottom-bar/BottomBar";
import MobileTopBar from "./Mobile/top-bar/MobileTopBar";

const Layout = (props) => {
  return (
    <main className="flex gap-4  w-full md:p-6 p-0  pt-14 md:pb-4 md:pt-6 pb-12">
      <section className="hidden  md:block w-1/6 ">
        <Sidebar />
      </section>

      <section className="w-full lg:w-5/6 md:w-5/6 lg:pl-3 xl:pl-0 md:pl-16 pl-0 ">
        <MobileTopBar />
        <div className=" flex-shrink-0 overflow-hidden  pt-0 hidden md:block">
          <TopBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 pb-4 md:pb-0 ">
          {props.children}
        </div>
      </section>
      <BottomBar />
    </main>
  );
};

export default Layout;
