import React from "react";
import ConnectList from "./ConnectList";
import ConnectChat from "./ConnectChat";
import ParentTimeTable from "../Layout/timeTables/parentTimeTable/ParentTimeTable";

const Connect = () => {
  return (
    <>
      <main className="w-full lg:w-8/12 ">
        <div className="w-full flex md:flex-row flex-col gap-4 ">
          <ConnectList />
          <ConnectChat />
        </div>
      </main>
      <aside className="w-full lg:w-4/12  hidden md:block">
        <ParentTimeTable />
      </aside>
    </>
  );
};

export default Connect;
