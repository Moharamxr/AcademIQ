import React from "react";

const AssignmentsDetails = () => {
  return (
    <div className="bg-white p-5 rounded-xl">
      <h3 className="font-poppins font-normal text-2xl leading-10 text-gray-700">
        Assignment Details
      </h3>
      <div className="p-3 flex flex-col">
        <div className="between">
          <h5 className="font-poppins font-medium text-lg leading-10 text-active">
            Assignment Name
          </h5>
          <p className="font-poppins font-light text-sm leading-10 text-green-400">
            5 Points
          </p>
        </div>
        <article className="py-2">
          <p>Description</p>
          <p className="font-poppins font-light text-sm leading-10 text-gray-400">
            I want to easily view the titles of tasks or assignments assigned by
            my teachers for today's homework.
          </p>
        </article>
        <hr />
        <article className="py-2">
          <p>DeadLine</p>
          <time className="font-poppins font-light text-sm leading-10 text-gray-400">
            24, May 2024 (12:00 PM)
          </time>
        </article>
        <form>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="assignmentAns">Attachment*</label>
            <textarea type="text" name="assignmentAns" id="assignmentAns" className="w-full h-24 outline-none bg-gray-100 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="assignmentComment">Add Comment (Optional)</label>
            <textarea type="text" name="assignmentComment" id="assignmentComment" className="w-full h-20 outline-none bg-gray-100 border border-gray-300 rounded-lg" />
          </div>
          <button className="bg-active text-white rounded-lg text-center text-lg w-full py-2 my-4">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentsDetails;
