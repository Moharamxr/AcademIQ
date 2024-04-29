import React, { useEffect, useState } from "react";
import AddPostIcon from "../../../../assets/icons/AddPostIcon";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";
import { getDiscussion } from "../../../../services/discussion.service";
import SkeletonPostCard from "./SkeletonPostCard";
import AddNewPost from "./AddNewPost";

const CoursePosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <div className="center flex-col gap-5 w-full pb-5  px-6">
      <div className="border-2 border-gray-200/70 rounded-xl p-4 flex gap-4 lg:w-5/6 px-6 w-full">
        <span onClick={onOpen}>
          <AddPostIcon />
        </span>

        <p className="font-poppins  text-gray-700 pt-1 text-lg leading-7">
          Add new post 
        </p>
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
