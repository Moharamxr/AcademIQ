import React, { useEffect, useState } from "react";
// import ThreeDots from "../../../../assets/icons/ThreeDots";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addComment,
  getPostComments,
  likePost,
} from "../../../../services/discussion.service";
import { CircularProgress, Skeleton } from "@mui/material";
const PostCard = ({ post, courseId }) => {
  const formatDate = (time) => {
    const date = new Date(time);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likesCount, setLikesCount] = useState(post?.likes?.length || 0);
  const [commentsCount, setCommentsCount] = useState(post?.comments?.length);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [addCommentToggle, setAddCommentToggle] = useState(false);
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  useEffect(() => {
    const firstName = post?.creator?.name?.first;
    const lastName = post?.creator?.name?.last;
    const initials = firstName.charAt(0) + lastName.charAt(0);
    setInitials(initials);
    const randomColor = () => {
      const hex = Math.floor(Math.random() * 0xffffff);
      return "#" + ("000000" + hex.toString(16)).substr(-6);
    };
    const generatedColor = randomColor();
    setBgColor(generatedColor);
    
  }, []);

  useEffect(() => {
    setIsLiked(post?.isLiked);
    setLikesCount(post?.likes?.length);
    setCommentsCount(post?.comments?.length);
  }, [post]);

  const toggleComments = () => {
    if (commentsCount === 0) return;
    setShowComments(!showComments);
  };

  const getComments = async () => {
    try {
      setIsCommentsLoading(true);
      const data = await getPostComments(post._id);
      setIsCommentsLoading(false);
      setComments(data?.postComments);
      setCommentsCount(data?.postComments?.length);
    } catch (error) {
      console.error("Error fetching comments: ", error);
      setIsCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (showComments && commentsCount > 0) {
      getComments();
    }
  }, [showComments]);

  const handleAddComment = async () => {
    if (!addCommentToggle) return;
    if (!comment) return;
    setAddingComment(true);
    const commentData = {
      content: comment,
      courseId,
    };

    try {
      await addComment(post._id, commentData);
      setAddingComment(false);
      setAddCommentToggle(false);
      setComment("");
      getComments();
    } catch (error) {
      console.error("Error adding comment: ", error);
      setAddingComment(false);
    }
  };

  const toggleLike = async () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    try {
      await likePost(post._id);
    } catch (error) {
      console.error("Error toggling like: ", error);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    }
  };
  return (
    <div className="flex flex-col border-2 divide-y-2 border-gray-200/70 rounded-xl lg:w-5/6 w-full">
      <div className="between p-4">
        <div className="flex gap-2">
          <div
            className="w-10 h-10 text-white text-xl rounded-full center mr-2"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>

          <p className="font-poppins">
            {post?.creator?.name?.first} {post?.creator?.name?.last}
            <br />
            <time className="text-gray-300 text-sm">
              {formatDate(post?.createdAt)}
            </time>
          </p>
        </div>
        {/* <span className="pe-4">
          <ThreeDots />
        </span> */}
      </div>
      <article className="font-poppins p-4 text-gray-700 ">
        {post?.content}
      </article>

      <div className="py-4 px-5 between ">
        <span onClick={toggleLike}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />} {likesCount}
        </span>
        <span
          className="font-poppins text-gray-400 text-sm  cursor-pointer select-none "
          onClick={toggleComments}
        >
          {commentsCount === 0 ? "No Comments" : `${commentsCount} Comments`}
        </span>
        <span
          className="font-poppins text-gray-400 text-sm cursor-pointer select-none"
          onClick={() => setAddCommentToggle(!addCommentToggle)}
        >
          {addCommentToggle ? "Cancel" : "Add comment"}
        </span>
      </div>
      {addCommentToggle && (
        <div className="between ">
          <input
            type="text"
            placeholder="comment..."
            className="font-poppins text-gray-600 text-sm bg-gray-200/30 outline-none  w-5/6 p-3 rounded-"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            name="comment"
          />

          <button
            className="font-poppins text-gray-600 hover:bg-gray-300 py-3   w-1/6   text-sm cursor-pointer "
            onClick={handleAddComment}
          >
            {addingComment ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Add comment"
            )}
          </button>
        </div>
      )}
      {showComments && (
        <div className="flex-col divide-y-2 ">
          {isCommentsLoading && (
            <div className=" gap-2 p-2">
              <div className="font-poppins text-sm font-semibold between">
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </div>

              <Skeleton variant="text" width={200} height={20} />
            </div>
          )}
          {comments?.map((comment, index) => (
            <div key={index} className=" gap-2 p-2">
              <div className="font-poppins text-sm font-semibold between">
                <span>
                  {comment?.creator?.name?.first} {comment?.creator?.name?.last}
                </span>

                <time className="text-gray-300 text-sm font-normal">
                  {formatDate(new Date())}
                </time>
              </div>
              <p className="font-poppins text-sm text-gray-700 py-2">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
