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
  const selectedContact = useSelector(
    (state) => state.reportsData.selectedContact
  );
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    const reportsData = await getUserReport(true);
    setReports(reportsData.reports);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    setSelectedReport(reports?.find((report) => report?.to === selectedContact?._id));
  }, [selectedContact, reports]);

  return (
    <div className="w-full flex flex-col gap-4 md:flex-row">
      <ReportList reports={reports} />
      {toggleNewMessage ? (
        <ReportNewMessage />
      ) : (
        <ReportMessages report={selectedReport} loading={loading} />
      )}
    </div>
  );
};

export default Report;
