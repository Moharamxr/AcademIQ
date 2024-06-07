import React, { useEffect, useState } from "react";
import ConnectList from "./ConnectList";
import ConnectChat from "./ConnectChat";
import { getMyChats } from "../../services/connect.service";

const Connect = () => {
  const [chats , setChats] = useState([]);
  const [chatsLoading , setChatsLoading] = useState(false);

  const fetchChats = async () => {
    setChatsLoading(true);
    try {
      const chats = await getMyChats();
      setChats(chats?.chats.reverse());
    } finally {
      setChatsLoading(false);
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);


  return (
    <div className="w-full flex md:flex-row flex-col gap-4 ">
      <ConnectList chats={chats} loading={chatsLoading} />
      <ConnectChat fetchChats={fetchChats} />
    </div>  
  );
};

export default Connect;
