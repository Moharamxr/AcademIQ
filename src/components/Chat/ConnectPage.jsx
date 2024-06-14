import React from "react";
import ConnectList from "./ConnectList";
import ConnectChat from "./ConnectChat";

const ConnectPage = () => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-4">
      <ConnectList />
      <ConnectChat />
    </div>
  );
};

export default ConnectPage;
