import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import ConnectList from "./ConnectList";
import ConnectChat from "./ConnectChat";

const ConnectPage = () => {
  const activeTab = useSelector((state) => state.chatData.activeTab);
  console.log(activeTab);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 

  if (isMobile) {
    if (activeTab === "inbox") {
      return <ConnectList />;
    } else if (activeTab === "chat") {
      return <ConnectChat />;
    }
  }

  return (
    <div className="w-full flex md:flex-row flex-col gap-4">
      <ConnectList />
      <ConnectChat />
    </div>
  );
};

export default ConnectPage;
