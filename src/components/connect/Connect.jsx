import React, { useEffect, useState } from "react";
import ConnectList from "./ConnectList";
import ConnectChat from "./ConnectChat";
import { getMyChats } from "../../services/connect.service";

const Connect = () => {
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);

  const fetchChats = async () => {
    setChatsLoading(true);
    try {
      const response = await getMyChats();
      const sortedChats = response?.chats.sort((a, b) => {
        const dateA = new Date(a.lastMessage[0]?.updatedAt || a.createdAt);
        const dateB = new Date(b.lastMessage[0]?.updatedAt || b.createdAt);
        return dateB - dateA; // Sort in descending order
      });
      setChats(sortedChats || []);
    } catch (error) {
      console.error("Failed to fetch chats", error);
    } finally {
      setChatsLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="w-full flex md:flex-row flex-col gap-4">
      <ConnectList chats={chats} loading={chatsLoading} fetchChats={fetchChats} />
      <ConnectChat />
    </div>
  );
};

export default Connect;
