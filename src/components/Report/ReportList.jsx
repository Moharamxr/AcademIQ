import React, { useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import ReportListCard from "./ReportListCard";
import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

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

const ReportList = ({ sentReports, receivedReports, loading }) => {
  const selectedReport = useSelector(
    (state) => state.reportsData.selectedReport
  );
  const isSent = useSelector((state) => state.reportsData.isSent);
  const contact = isSent ? selectedReport?.to : selectedReport?.from;
  const tabs = {
    sent: sentReports,
    received: receivedReports,
  };

  const [activeTab, setActiveTab] = useState("received");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    setShowSearch(true);
    setSearchTerm(e.target.value);
    const filtered = tabs[activeTab].filter(
      (report) =>

        (!isSent &&
          report?.from?.name?.first
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        (!isSent &&
          report?.from?.name?.last
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        (isSent &&
          report?.to?.name?.first
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        (isSent &&
          report?.to?.name?.last
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        report?.body.toLowerCase().includes(e.target.value.toLowerCase()) ||
        report?.subject.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  const toggleSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
    setFilteredReports([]);
  };

  const checkIsActive = (report) => {
    return selectedReport?._id === report?._id;
  };

  const displayContacts = showSearch ? filteredReports : tabs[activeTab];
  return (
    <ConnectListContainer className="bg-white w-full md:w-4/12 rounded-xl min-h-80 p-4 pt-0 overflow-hidden">
      <FixedTopContent className="bg-white pt-4">
        <h3 className="font-poppins font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-normal md:leading-relaxed text-center py-1 pb-2">
          Inbox
        </h3>

        <div className="flex border-opacity-40 border-b border-b-slate-400 pb-2 px-2">
          <div
            className="hover:shadow-sm hover:bg-gray-100 rounded-lg hover:cursor-pointer"
            onClick={toggleSearch}
          >
            {showSearch ? <CloseIcon /> : <SearchIcon />}
          </div>
          <input
            type="text"
            className="bg-transparent w-full outline-none text-center text-sm font-normal"
            placeholder="Search for reports"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {!showSearch && (
          <div className="flex justify-around gap-2 p-2">
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`${
                  activeTab === tab
                    ? "bg-blue-100/55 text-active"
                    : "bg-white text-slate-400"
                } font-poppins font-normal text-xs sm:text-sm px-4 py-1 rounded-lg`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
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
        ) : displayContacts?.length > 0 ? (
          displayContacts.map((report) => (
            <ReportListCard
              key={report?._id}
              report={report}
              active={checkIsActive(report)}
              sent={activeTab === "sent"}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center pt-4">No reports found</p>
        )}
      </div>
    </ConnectListContainer>
  );
};

export default ReportList;
