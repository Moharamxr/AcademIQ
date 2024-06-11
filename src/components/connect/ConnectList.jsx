import React, { useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import ConnectListCard from "./ConnectListCard";
import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { searchUsers } from "../../services/user.service";

const ConnectListContainer = styled("div")({
  height: "88vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const ConnectList = ({ chats, loading, fetchChats }) => {
  const selectedChat = useSelector((state) => state.chatData.selectedChat);

  const [filteredChats, setFilteredChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (e) => {
    setShowSearch(true);
    setSearchTerm(e.target.value);
    const searchTermLower = e.target.value.toLowerCase();

    if (searchTermLower.trim() === "") {
      setFilteredChats([]);
      return;
    }

    const data = await searchUsers(searchTermLower);
    const users = data?.users || [];

    const filtered = chats.filter((chat) => {
      if (chat.type === "private") {
        return (
          chat.member &&
          `${chat.member.name.first} ${chat.member.name.last}`
            .toLowerCase()
            .includes(searchTermLower)
        );
      } else if (chat.type === "group") {
        const membersMatch = chat.members.some((member) =>
          `${member.name.first} ${member.name.last}`
            .toLowerCase()
            .includes(searchTermLower)
        );
        const titleMatch =
          chat.title?.toLowerCase().includes(searchTermLower) || false;
        const descriptionMatch =
          chat.description?.toLowerCase().includes(searchTermLower) || false;

        return membersMatch || titleMatch || descriptionMatch;
      }
      return false;
    });

    setFilteredChats([...users, ...filtered]);
  };

  const toggleSearch = () => {
    setShowSearch(false);
    fetchChats();
    setSearchTerm("");
    setFilteredChats([]);
  };

  const checkIsActive = (chat) => {
    return selectedChat?._id === chat?._id;
  };

  const displayContacts = showSearch ? filteredChats : chats;

  return (
    <ConnectListContainer className="bg-white w-full md:w-6/12 lg:w-4/12 rounded-xl max-h-[50rem] h-fit min-h-min p-4 pt-0 overflow-hidden">
      <FixedTopContent className="bg-white pt-4">
        <h3 className="font-poppins font-normal select-none text-base md:text-lg lg:text-xl xl:text-2xl leading-normal md:leading-relaxed text-center py-1 pb-2">
          Inbox
        </h3>

        <div className="flex border-opacity-40 border-b border-b-slate-400 pb-2 px-2">
          <div className="hover:shadow-sm hover:bg-gray-100 rounded-lg hover:cursor-pointer">
            {showSearch ? (
              <span onClick={toggleSearch}>
                <CloseIcon />
              </span>
            ) : (
              <SearchIcon />
            )}
          </div>
          <input
            type="text"
            className="bg-transparent w-full outline-none text-center text-sm font-normal"
            placeholder="Search for Chats"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </FixedTopContent>

      <div className="w-full mx-auto flex flex-col gap-y-2 py-2">
        {loading ? (
          [...Array(7)].map((_, index) => (
            <Skeleton key={index} variant="rounded" height={55} />
          ))
        ) : displayContacts.length > 0 ? (
          displayContacts.map((chat) => (
            <ConnectListCard
              key={chat?._id + (chat?.title || "")}
              chat={chat}
              active={checkIsActive(chat)}
              closeSearch={toggleSearch}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center pt-4">No Chats found</p>
        )}
      </div>
    </ConnectListContainer>
  );
};

export default ConnectList;
