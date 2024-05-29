import React from "react";

const ReportMessageCard = ({ report }) => {
  function formatISODateToTime(isoDate) {
    const date = new Date(isoDate);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const createdAt = report?.createdAt ? formatISODateToTime(report.createdAt) : "No date available";

  return report?.body ? (
    <div className={`flex flex-row-reverse gap-x-4 p-5   bg-white shadow-sm`}>
      <div className={`flex flex-col items-end w-full`}>
        <div className={`py-1 flex flex-col w-full`}>
          <div className={`font-poppins font-light leading-4 text-slate-800 text-sm bg-blue-100/55 rounded-lg p-4 px-0 break-inside-auto w-full`}>
            <div className={`flex justify-start border-b-2 border-gray-300`}>
              <p className="font-semibold text-2xl py-2 px-4">{report?.subject}</p>
            
            </div>
            <div className={`flex justify-start py-3 px-4`}>
              <p className="mb-2 ">{report?.body}</p>
            </div>
            {report?.attachments?.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-semibold">Attachments:</span>
                <div className="flex flex-wrap gap-2">
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                  {report?.attachments.map((attachment) => (
                    <img src={attachment} key={attachment} alt="attachment" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                  ))}
                </div>
              </div>
            )}
          </div>
          <time className={`font-poppins text-xs text-slate-500 mt-2 self-end`}>
            {createdAt}
          </time>
        </div>
      </div>
    </div>
  ) : null;
};

export default ReportMessageCard;
