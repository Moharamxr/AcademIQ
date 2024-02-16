import React from "react";
import Sidebar from "./sidebar/Sidebar";
import ParentTimeTable from "./timeTables/parentTimeTable/ParentTimeTable";
import TopBar from "./top-bar/TopBar";

const Layout = (props) => {
  return (
    <div className="flex flex-wrap w-full md:p-6 p-1">
      <div className="hidden  md:block w-1/6 ">
        <Sidebar />
      </div>

      <div className="w-full lg:w-5/6 md:w-5/6 lg:pl-4 md:pl-16 ">
        <div className=" flex-shrink-0 overflow-hidden  ">
         <TopBar/>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-9/12 me-2 pb-4">
            {props.children}
          </div>
          <div className="w-full lg:w-3/12 ms-2">
            <ParentTimeTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
