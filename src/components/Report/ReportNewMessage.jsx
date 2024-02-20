import React from "react";
import SendMessageIcon from "../../assets/icons/SendMessageIcon";
import { useState } from "react";

const ReportNewMessage = () => {
  
  return (
   
    <div className="bg-white container flex flex-col rounded-2xl w-full md:w-8/12">
      <div className="container between py-2 px-4">
        <h5 class="font-poppins font-medium text-xl leading-10 text-gray-900">
          New Message
        </h5>
        <span className="pe-4 rounded-md" >
          <SendMessageIcon />
        </span>
      </div>
      <hr />
      <div className="flex flex-col gap-y-1 pt-3 px-6 ">
        <div className="flex">
          <p className="font-poppins font-normal text-sm leading-6 flex items-end text-gray-900 pb-2">
            To :
          </p>
          <input
            type="text"
            name="to"
            id="to"
            className="outline-none bg-transparent h-11 px-2 w-80"
          />
        </div>
        <hr />
        <p className="font-poppins font-normal text-sm leading-6 flex items-end text-gray-900 pb-2">
          Cc / Bcc.From : Cooper-Leslie{" "}
        </p>
        <hr />
        <div className="flex">
          <p className="font-poppins font-normal text-sm leading-6 flex items-end text-gray-900 pb-2">
            Subject :{" "}
          </p>
          <input
            type="text"
            name="Subject"
            id="Subject "
            className="outline-none bg-transparent h-11 px-2 w-80"
          />
        </div>
        <hr />
        <div className="flex">
          <textarea
            type="text"
            name="type a message"
            id="ReportMessage"
            placeholder="Type a message"
            className="outline-none bg-transparent h-40 px-2 w-full text-sm  max-h-80"
          />
        </div>
      </div>
    </div>
  );
};

export default ReportNewMessage;
