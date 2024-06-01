import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMessageIcon from "../../assets/icons/SendMessageIcon";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { sendReport } from "../../services/report.service";
import { CircularProgress } from "@mui/material";
import { setToggleNewMessage } from "../../store/slices/reportsSlice";
import { BiAddToQueue, BiLoader } from "react-icons/bi";

const ReportNewMessage = ({fetchReports}) => {
  
  const fullName = localStorage.getItem("fullName");

  const [priority, setPriority] = useState("high");
  const [attachment, setAttachment] = useState(null);
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAttachment = (e) => {
    setAttachment(e.target.files[0]);
  };
  const validateData = () => {
    if (!to) {
      setError("To is required");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    } else if (!subject) {
      setError("Subject is required");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    } else if (!body) {
      setError("Body is required");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    }

    return true;
  };

  const reset = () => {
    setBody("");
    setSubject("");
    setAttachment(null);
  };

  const dispatch = useDispatch();

  const handleSend = async () => {
    const isValid = validateData();
    if (!isValid) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("attachments", attachment);
    formData.append("body", body);
    formData.append("subject", subject);
    formData.append("priority", priority);
    formData.append("to", to);

    try {
      await sendReport(formData);
      reset();
      fetchReports();
      dispatch(setToggleNewMessage({ toggleNewMessage: false }));
    } catch (error) {
      setError(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "An error occurred"
      );
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white container flex flex-col rounded-2xl w-full md:w-6/12 lg:w-8/12">
      <div className="container flex justify-between py-2 pt-4 px-4">
        <h5 className="font-poppins font-medium text-xl leading-10 text-gray-900">
          New Report
        </h5>
        {error && <p className="text-red-500">{error}</p>}
        <span className="pe-4 rounded-md" onClick={handleSend}>
          {loading ? <BiLoader /> : <SendMessageIcon />}
        </span>
      </div>
      <hr />
      <div className="flex flex-col gap-y-1 pt-3 px-6">
        <div className="flex w-full items-center gap-1">
          <label className="font-poppins font-normal text-sm leading-6 text-gray-900 ">
            To :
          </label>
          <input
            type="To"
            name="To"
            id="To"
            className="outline-none bg-gray-100/50 h-11 px-2 w-11/12 rounded-md"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <hr />
        <p className="font-poppins font-normal text-sm leading-6 text-gray-900 ">
          Cc / Bcc. From: {fullName}
        </p>
        <hr />
        <div className="flex w-full items-center gap-1">
          <label className="font-poppins font-normal text-sm leading-6 text-gray-900 ">
            Subject:
          </label>
          <input
            type="text"
            name="Subject"
            id="Subject"
            className="outline-none bg-gray-100/50 h-11 px-2 w-11/12 rounded-md"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <hr />
        <div className="flex items-center">
          <label className="font-poppins font-normal text-sm leading-6 text-gray-900 ">
            Priority:
          </label>
          <select
            name="Priority"
            id="Priority"
            className="outline-none bg-gray-50 h-11 px-2 w-80"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <hr />
        <div className="flex items-center">
          <label
            htmlFor="repAttachment"
            className="cursor-pointer flex gap-5 w-full items-center bg-gray-50"
          >
            <AttachmentIcon fontSize="large" />
            {/* <span className="border-2 border-dashed border-gray-400 p-1 rounded w-full text-center text-gray-700 hover:border-gray-500 hover:text-gray-600">
              Select a file
            </span> */}
            <input
              id="repAttachment"
              type="file"
              className=""
              onChange={handleAttachment}
            />
          </label>
        </div>
        <hr />
        <div className="flex pt-2">
          <textarea
            name="ReportMessage"
            id="ReportMessage"
            placeholder="Type a message"
            className="outline-none bg-gray-100/70 h-48 px-2 w-full max-h-80"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportNewMessage;
