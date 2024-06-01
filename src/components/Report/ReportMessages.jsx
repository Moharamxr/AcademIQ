import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { setToggleNewMessage } from "../../store/slices/reportsSlice";
import EditIcon from "../../assets/icons/EditIcon";
import ReportMessageCard from "./ReportMessageCard";
import { getReport, replayReport } from "../../services/report.service";
import { CircularProgress, Skeleton } from "@mui/material";
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
  const selectedReport = useSelector((state) => state.reportsData.selectedReport);

  const dispatch = useDispatch();
  const [report, setReport] = useState(selectedReport);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReportById = async () => {
    if (!selectedReport?._id) return;
    setLoading(true);
    try {
      const data = await getReport(selectedReport._id, true);
      setReport(data?.report);
    } catch (error) {
      setError("Failed to fetch report details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedReport?._id) {
      fetchReportById();
    }
  }, [selectedReport]);

  const isSent = useSelector((state) => state.reportsData.isSent);
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

    try {
      await replayReport(report._id, { body: replay });
      fetchReports();
      setReplay("");
      setReplaySuccess(true);
      setTimeout(() => {
        setReplaySuccess(false);
      }, 1000);
    } finally {
      setReplayLoading(false);
    }
  };

  if (!selectedReport?._id) {
    return <div className="w-full min-h-[36rem] center bg-white rounded-xl md:w-6/12 lg:w-8/12">No report selected</div>;
  }

  return (
    <ConnectChatContainer className="bg-white rounded-2xl w-full md:w-6/12 lg:w-8/12 overflow-hidden">
      <FixedTopContent className="w-full between bg-white px-4 pe-6 py-3 border-b-gray-300 border-b-2 border-opacity-40">
        <div className="flex gap-2">
          {loading ? (
            <Skeleton variant="circular" width={56} height={56} />
          ) : contact?.profilePicture?.url ? (
            <img
              src={contact.profilePicture.url}
              alt="profile-pic"
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div
              className={`w-14 h-14 bg-${contact?.profilePicture?.color || "white"} text-white text-2xl rounded-full center select-none cursor-pointer`}
              style={{ backgroundColor: contact?.profilePicture?.color }}
            >
              {initials}
            </div>
          )}
          <div className="flex flex-col p-1 pb-0">
            {loading ? (
              <Skeleton variant="text" width={100} />
            ) : (
              <p className="font-poppins font-normal text-xs sm:text-sm">
                {contact?.name?.first} {contact?.name?.last}
              </p>
            )}
            {loading ? (
              <Skeleton variant="text" width={150} />
            ) : (
              <p className="font-poppins font-light text-xs text-gray-400">
                {contact?.email}
              </p>
            )}
            {loading ? (
              <Skeleton variant="text" width={50} />
            ) : (
              <p className="font-poppins font-light text-sm pt-1 text-active">
                {!isSent ? "To : You" : `From : You`}
              </p>
            )}
          </div>
        </div>
        {role !== "parent" && !loading && (
          <span onClick={handleOpenAddMessage}>
            <EditIcon />
          </span>
        )}
      </FixedTopContent>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : report ? (
        <div className="w-full flex flex-col gap-1 pb-4 min-h-[28rem]">
          <ReportMessageCard
            key={report._id}
            forward={report?.from?._id === localStorage.getItem("userId")}
            report={report}
          />
          {report?.reply && !isSent && <ReplyCard report={report} />}
        </div>
      ) : (
        <div className="w-full h-full center">{error}</div>
      )}
      {!isSent && report?.body && !report?.reply && (
        <FixedBottomContent className="bg-white">
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
              disabled={replayLoading}
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
  );
};

export default ReportMessages;
