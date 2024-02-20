import React from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import Teacher1 from "../../assets/connect-teatcher (1).png";
import Teacher2 from "../../assets/connect-teatcher (2).png";
import ReportListCard from "./ReportListCard";
import styled from "@emotion/styled";

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

const ReportList = () => {
  
  return (
    <ConnectListContainer className=" bg-white w-full  md:w-4/12  rounded-xl min-h-80 p-4 pt-0 overflow-hidden">
      <FixedTopContent className="bg-white pt-4">
        <h3 className="font-poppins font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-normal md:leading-relaxed text-center py-1 pb-2">
          Inbox
        </h3>
        <div className="flex border-opacity-40 border-b border-b-slate-400 pb-2 px-2 ">
          <div className="hover:shadow-sm hover:bg-gray-100 rounded-lg hover:cursor-pointer">
            <SearchIcon />
          </div>
          <input
            type="search"
            className="bg-transparent  outline-none  text-center text-sm font-normal"
            placeholder="Search for teachers"
          />
        </div>
      </FixedTopContent>

      <div className="w-full mx-auto flex flex-col gap-y-2 py-2">
        <ReportListCard img={Teacher1} active={true} />
        <ReportListCard img={Teacher2} active={false} />
        <ReportListCard img={Teacher1} active={false} />
        <ReportListCard img={Teacher2} active={false} />
        <ReportListCard img={Teacher1} active={false} />
        <ReportListCard img={Teacher2} active={false} />
        <ReportListCard img={Teacher1} active={false} />
        <ReportListCard img={Teacher2} active={false} />
        <ReportListCard img={Teacher1} active={false} />
        <ReportListCard img={Teacher2} active={false} />
      </div>
    </ConnectListContainer>
  );
};

export default ReportList;
