import React, { useEffect, useState } from "react";
import AddPostIcon from "../../../assets/icons/AddPostIcon";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";
import { getDiscussion } from "../../../services/discussion.service";
import SkeletonPostCard from "./SkeletonPostCard";
import AddNewPost from "./AddNewPost";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { createCourseMeeting } from "../../../services/courses.service";
import { CircularProgress } from "@mui/material";
const CoursePosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meetLoading, setMeetLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getPostsData();
  };
  const onOpen = () => setIsOpen(true);

  const getPostsData = async () => {
    try {
      setIsLoading(true);
      const data = await getDiscussion(id);
      setIsLoading(false);
      setPosts(data?.discussion?.posts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const createMeeting = async () => {
    try {
      setMeetLoading(true);
      const data = await createCourseMeeting(id);
      getPostsData();
      console.log(data);
    } catch (error) {
      console.error("Error creating meeting: ", error);
    } finally {
      setMeetLoading(false);
    }
  };

  return (
    <div className="center flex-col gap-5 w-full pb-5  px-6">
      <div className="w-full grid grid-cols-6 gap-3">
        <div className="border-2 border-gray-200/70 rounded-xl p-4 flex gap-4 col-span-5  px-6  ">
          <span onClick={onOpen}>
            <AddPostIcon />
          </span>

          <p className="font-medium  text-gray-700 pt-1 text-lg leading-7">
            Add new post
          </p>
        </div>
        <div
          className="col-span-1 p-4 border-2 rounded-xl border-gray-200/70 center cursor-pointer hover:bg-gray-50"
          onClick={createMeeting}
        >
          {meetLoading ? (
            <CircularProgress size={20} />
          ) : (
            <VideoCallIcon fontSize="large" className="text-active " />
          )}
        </div>
      </div>

      {isLoading && <SkeletonPostCard />}
      {posts.map((post, index) => (
        <PostCard
          key={index}
          post={post}
          getPostsData={getPostsData}
          courseId={id}
        />
      ))}
      <AddNewPost
        getPostsData={getPostsData}
        courseId={id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default CoursePosts;
