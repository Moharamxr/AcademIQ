import React from "react";
import ConnectList from "./ConnectList";
import ConnectChat from "./ConnectChat";
import ParentTimeTable from "../Layout/timeTables/parentTimeTable/ParentTimeTable";

const Connect = () => {
  return (
    <>
      <div className="w-full lg:w-8/12 lg:ps-4  pb-4">
        <div className="w-full flex md:flex-row flex-col gap-x-4 ">
          <ConnectList />
          <ConnectChat />
        </div>
      </div>
      <div className="w-full lg:w-4/12  hidden md:block">
        <ParentTimeTable />
      </div>
    </>
  );
};

export default Connect;
