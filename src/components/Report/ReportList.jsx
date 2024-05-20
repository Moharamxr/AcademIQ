import React, { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import ReportListCard from "./ReportListCard";
import styled from "@emotion/styled";
import { getUsers } from "../../services/user.service";
import { Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedContact,
  setToggleNewMessage,
} from "../../store/slices/reportsSlice";
import { getUserReport } from "../../services/report.service";

const ConnectListContainer = styled("div")({
  height: "36rem",
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

const ReportList = ({ reports }) => {
  const dispatch = useDispatch();
  const selectedContact = useSelector(
    (state) => state.reportsData.selectedContact
  );
  console.log(selectedContact)
  const role = localStorage.getItem("role");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      let fetchedContacts = [];
      if (role === "admin") {
        const parentsData = await getUsers("parent");
        const teachersData = await getUsers("teacher");
        fetchedContacts = [...parentsData?.users, ...teachersData?.users];
      } else if (role === "teacher") {
        const receivedReports = await getUserReport(false);
        fetchedContacts = [...reports, ...receivedReports?.reports];
      }
      setContacts(fetchedContacts);
      if (fetchedContacts.length > 0) {
        dispatch(setSelectedContact({ contact: fetchedContacts[0] }));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [reports]);

  const handleSearch = (e) => {
    setShowSearch(true);
    setSearchTerm(e.target.value);
    const newContacts = contacts.filter((contact) =>
      contact?.name?.first.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredContacts(newContacts);
  };

  const toggleSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
    setFilteredContacts([]);
  };

  const handleSelectedContact = (contact) => {
    dispatch(setSelectedContact({ contact }));
    dispatch(setToggleNewMessage({ toggleNewMessage: false }));
  };

  const checkActive = (contact) => {
    if (role === "admin") {
      return selectedContact === contact;
    } else {
      return (
        selectedContact?._id === contact?.to ||
        selectedContact?._id === contact?.from
      );
    }
  };

  const displayContacts = showSearch ? filteredContacts : contacts;

  return (
    <ConnectListContainer className="bg-white w-full md:w-4/12 rounded-xl min-h-80 p-4 pt-0 overflow-hidden">
      <FixedTopContent className="bg-white pt-4">
        <h3 className="font-poppins font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-normal md:leading-relaxed text-center py-1 pb-2">
          Inbox
        </h3>
        {role === "admin" && (
          <div className="flex border-opacity-40 border-b border-b-slate-400 pb-2 px-2">
            <div
              className="hover:shadow-sm hover:bg-gray-100 rounded-lg hover:cursor-pointer"
              onClick={toggleSearch}
            >
              {showSearch ? <CloseIcon /> : <SearchIcon />}
            </div>
            <input
              type="search"
              className="bg-transparent w-full outline-none text-center text-sm font-normal"
              placeholder="Search for users"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        )}
      </FixedTopContent>

      <div className="w-full mx-auto flex flex-col gap-y-2 py-2">
        {loading ? (
          <>
            {[...Array(7)].map((_, index) => (
              <Skeleton key={index} variant="rounded" height={55} />
            ))}
          </>
        ) : (
          displayContacts.map((contact) => (
            <span
              key={contact?._id}
              onClick={() => handleSelectedContact(contact)}
            >
              <ReportListCard contact={contact} active={checkActive(contact)} />
            </span>
          ))
        )}
      </div>
    </ConnectListContainer>
  );
};

export default ReportList;
