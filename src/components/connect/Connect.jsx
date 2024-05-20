import React from "react";
import ConnectList from "./ConnectList";
import ConnectChat from "./ConnectChat";
import ParentTimeTable from "../Layout/timeTables/parentTimeTable/ParentTimeTable";

const Connect = () => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-4 ">
      <ConnectList />
      <ConnectChat />
    </div>  
  );
};

export default Connect;
