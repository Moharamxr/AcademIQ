import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { setToggleNewMessage } from "../../store/slices/reportsSlice";
import EditIcon from "../../assets/icons/EditIcon";
import ReportMessageCard from "./ReportMessageCard";
import { replayReport } from "../../services/report.service";
import { CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReplyCard from "./ReplyCard";
const ConnectChatContainer = styled("div")({
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
const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const ReportMessages = ({ fetchReports }) => {
  const role = localStorage.getItem("role");
  const selectedReport = useSelector(
    (state) => state.reportsData.selectedReport
  );
  const isSent = useSelector((state) => state.reportsData.isSent);
  const dispatch = useDispatch();

  const contact = isSent ? selectedReport?.to : selectedReport?.from;

  const handleOpenAddMessage = () => {
    dispatch(setToggleNewMessage({ toggleNewMessage: true }));
  };

  const initials =
    contact?.name?.first && contact?.name?.last
      ? `${contact.name.first[0]}${contact.name.last[0]}`
      : "";
  const [replay, setReplay] = useState("");
  const [replayLoading, setReplayLoading] = useState(false);
  const [replaySuccess, setReplaySuccess] = useState(false);

  const handleReplay = async () => {
    if (replay.trim() === "") return;
    setReplayLoading(true);

    await replayReport(selectedReport._id, { body: replay });
    fetchReports();
    setReplay("");
    setReplaySuccess(true);
    setTimeout(() => {
      setReplaySuccess(false);
    }, 1000);
    setReplayLoading(false);
  };

  return (
    selectedReport?.from && (
      <ConnectChatContainer
        className={`bg-white ${
          !selectedReport ? "hidden" : ""
        } rounded-2xl w-full md:w-8/12 overflow-hidden`}
      >
        <FixedTopContent className="w-full between bg-white px-4 pe-6 py-3 border-b-gray-300 border-b-2 border-opacity-40">
          <div className="flex gap-2">
            {contact?.profilePicture?.url ? (
              <img
                src={contact.profilePicture.url}
                alt="profile-pic"
                className="w-14 h-14 rounded-full"
              />
            ) : (
              <div
                className={`w-14 h-14 bg-${
                  contact?.profilePicture?.color || "white"
                } text-white text-2xl rounded-full center select-none cursor-pointer`}
                style={{ backgroundColor: contact?.profilePicture?.color }}
              >
                {initials}
              </div>
            )}
            <div className="flex flex-col  p-1 pb-0">
              <p className="font-poppins font-normal text-xs sm:text-sm">
                {contact?.name?.first} {contact?.name?.last}
              </p>
              <p className="font-poppins font-light text-xs text-gray-400">
                {contact?.email}
              </p>
              <p className="font-poppins font-light text-sm pt-1 text-active">
                {!isSent
                  ? "To : You"
                  : `From : You`}
              </p>
            </div>
          </div>
          {role !== "parent" && (
            <span onClick={handleOpenAddMessage}>
              <EditIcon />
            </span>
          )}
        </FixedTopContent>
        {selectedReport && (
          <div className="w-full flex flex-col gap-1 pb-4 min-h-[28rem]">
            <ReportMessageCard
              key={selectedReport._id}
              forward={
                selectedReport?.from?._id === localStorage.getItem("userId")
              }
              report={selectedReport}
            />
            {selectedReport?.reply && !isSent && (
              <ReplyCard report={selectedReport} />
            )}
          </div>
        )}
        {!isSent && selectedReport?.body && !selectedReport?.reply && (
          <FixedBottomContent className="bg-white ">
            <div className="w-full flex gap-2 p-2">
              <input
                type="text"
                className="bg-gray-100 w-full rounded-lg p-2 outline-none text-gray-600"
                placeholder="Type a message"
                value={replay}
                onChange={(e) => setReplay(e.target.value)}
              />
              <button
                className="bg-active text-white rounded-lg px-4 py-2"
                onClick={handleReplay}
                disabled={replayLoading} // Disable button when loading
              >
                {replayLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : replaySuccess ? (
                  <CheckCircleOutlineIcon color="inherit" size={20} />
                ) : (
                  "Replay"
                )}
              </button>
            </div>
          </FixedBottomContent>
        )}
      </ConnectChatContainer>
    )
  );
};

export default ReportMessages;
