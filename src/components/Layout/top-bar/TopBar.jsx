import React, { useState, useEffect } from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import NotificationIcon from "../../../assets/icons/NotificationIcon";
import { useNavigate } from "react-router-dom";
import { getNotifications, searchAll } from "../../../services/user.service";
import { Skeleton, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSearchData } from "../../../store/slices/searchSlice";
import { BiLoader } from "react-icons/bi";
import { socket } from "../../../services/connect.service";

const NotificationContainer = styled("div")({
  MaxHeight: "90vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "lightgray",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
});

const NotificationCard = ({ notification }) => {
  const timePassed = (date) => {
    const currentDate = new Date();
    const notificationDate = new Date(date);
    const diff = currentDate - notificationDate;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else {
      return `${minutes} minutes ago`;
    }
  };
  return (
    <div className="p-2 border-b border-gray-200 bg-active-bg rounded-lg">
      <h3 className="font-semibold text">{notification.title}</h3>
      <p className="text-sm text-gray-700">{notification.message}</p>
      <p className="text-xs text-end text-active">
        {timePassed(notification.date)}
      </p>
    </div>
  );
};

const TopBar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    if (localStorage.getItem("role") === "admin") return;
    try {
      const data = await getNotifications();
      setNotifications(data?.notifications);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNewNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  useEffect(() => {
    socket.on("newNotification", handleNewNotification);
    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, []);


  const fullName = localStorage.getItem("fullName");
  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const initials = fullName
    ?.split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");
  const profilePictureUrl = localStorage.getItem("profilePictureUrl");
  const isProfilePicture = profilePictureUrl !== "undefined";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGotoProfile = () => {
    navigate(`/profile/${userId}`);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const searchLoading = useSelector((state) => state.searchData.loading);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    dispatch(setLoading({ loading: true }));
    navigate(`/search`);
    try {
      const data = await searchAll(searchTerm);
      dispatch(setSearchData({ data }));
    } catch (error) {
      console.error("Error searching: ", error);
    } finally {
      dispatch(setLoading({ loading: false }));
    }
  };

  return (
    <div className="grid grid-cols-12 gap-3 mb-4 pt-0 w-full relative">
      <div className="bg-white center xl:col-span-8 lg:col-span-7 col-span-6   h-14 p-3 px-4 rounded-xl">
        <div className="w-full bg-gray-200 bg-opacity-30 center p-1 rounded-lg">
          <div
            className="w-6 h-6 center rounded-md hover:shadow-gray-300 hover:bg-gray-200 hover:shadow-sm"
            onClick={handleSearch}
          >
            {searchLoading ? <BiLoader /> : <SearchIcon />}
          </div>
          <div className="w-full">
            <input
              type="text"
              name="topSearch"
              id="topSearch"
              placeholder="Search users, classes, courses, etc."
              className="bg-transparent w-full h-6 rounded-lg text-center font-dubai font-normal text-sm leading-6 text-gray-500 outline-none"
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
        </div>
      </div>
      <div className="xl:col-span-4 lg:col-span-5 col-span-6 h-14 flex justify-between  gap-5 xl:gap-x-3 lg:gap-x-1  relative">
        {isProfilePicture ? (
          <img
            src={profilePictureUrl}
            className="w-14 h-14 rounded-full cursor-pointer"
            onClick={handleGotoProfile}
          />
        ) : (
          <div
            className="w-14 h-14 bg-active text-white text-2xl rounded-full center select-none cursor-pointer"
            onClick={handleGotoProfile}
          >
            {initials}
          </div>
        )}
        <div
          className="bg-white xl:py-1 xl:px-2 w-7/12 overflow-hidden flex  flex-col justify-center items-center rounded-xl cursor-pointer"
          onClick={handleGotoProfile}
        >
          <p className="font-poppins font-normal lg:text-sm text-xs leading-6 text-black ">
            {fullName}
          </p>
          <p className="font-poppins font-normal xl:text-[11px] text-[9px] leading-5 overflow-hidden text-gray-400">
            {userEmail}
          </p>
        </div>

        <div className="relative">
          <div
            className="bg-white p-5 between rounded-2xl cursor-pointer"
            onClick={toggleNotificationDropdown}
          >
            <span className="relative inline-block">
              <NotificationIcon />
            </span>
          </div>
          {isNotificationOpen && (
            <NotificationContainer className="fixed top-20 right-5 mt-2 p-2 flex flex-col gap-2  w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {isLoading ? (
                <Skeleton variant="rectangular" height={70} />
              ) : (
                <>
                  {notifications.map((notification) => (
                    <NotificationCard
                      key={notification._id}
                      notification={notification}
                    />
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center text-gray-500">
                      No notifications
                    </p>
                  )}
                </>
              )}
            </NotificationContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
