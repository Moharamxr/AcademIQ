import React, { useEffect, useState } from "react";
import ReportList from "./ReportList";
import ReportMessages from "./ReportMessages";
import ReportNewMessage from "./ReportNewMessage";
import { useSelector } from "react-redux";
import { getUserReport } from "../../services/report.service";

const Report = () => {
  const toggleNewMessage = useSelector(
    (state) => state.reportsData.toggleNewMessage
  );
  
  const [sentReports, setSentReports] = useState([]);
  const [receivedReports, setReceivedReports] = useState([]);

  const [isReportLoading, setIsReportLoading] = useState(false);

  const fetchReports = async () => {
    setIsReportLoading(true);
    try {
      const receivedReports = await getUserReport(false);
      const sentReports = await getUserReport(true);
      setReceivedReports(receivedReports?.reports?.reverse());
      setSentReports(sentReports?.reports?.reverse());
    } finally {
      setIsReportLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 md:flex-row">
      <ReportList sentReports={sentReports} receivedReports={receivedReports} loading={isReportLoading} />
      {toggleNewMessage ? (
        <ReportNewMessage />
      ) : (
        <ReportMessages />
      )}
    </div>
  );
};

export default Report;
