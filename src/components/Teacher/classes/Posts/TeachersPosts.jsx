import React from "react";
import AddPostIcon from "../../../../assets/icons/AddPostIcon";

import PostCard from "./PostCard";
const TeachersPosts = () => {
  return (
    <div className="center flex-col gap-5 w-full pb-5">
      <div className="border-2 border-gray-200/70 rounded-xl p-4 flex gap-4 w-4/6">
        <AddPostIcon />
        <p className="font-poppins  text-gray-700 pt-1 text-lg leading-7">
          add post to your students now
        </p>
      </div>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
    </div>
  );
};

export default TeachersPosts;
