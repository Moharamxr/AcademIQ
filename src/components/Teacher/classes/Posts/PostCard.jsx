import React from "react";
import PostPic from "../../../../assets/Ellipse 136.png";
import ThreeDots from "../../../../assets/icons/ThreeDots";
const PostCard = () => {
  return (
    <div className="flex flex-col border-2 border-gray-200/70 rounded-xl lg:w-5/6 w-full">
      <div className="between p-4">
        <div className="flex gap-2">
          <img src={PostPic} alt="PostPic" />
          <p className="font-poppins">
            khaled mamdouh <br />
            <time className="text-gray-300 text-sm">Apr 12, 2024</time>
          </p>
        </div>
        <span className="pe-4">
          <ThreeDots />
        </span>
      </div>
      <article className="font-poppins p-4 text-gray-700 border-b-2 border-gray-200/70">
        Quiz-ll will be held next Sunday April 12 at 11:00 am. Prepare internet
        access and yourself in advance because the exam time will be regarded
        strictly in the released scores. Any delay in the exam submission time,
        the scores will not be considered. Best of luck to all
      </article>
      <div className="py-4 px-5 between">
        <button className="font-poppins text-gray-400 text-sm cursor-pointer ">
          Add comment{" "}
        </button>
        <span className="font-poppins text-gray-400 text-sm  ">8 Comments</span>
      </div>
    </div>
  );
};

export default PostCard;
