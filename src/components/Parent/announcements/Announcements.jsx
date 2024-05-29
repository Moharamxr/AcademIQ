import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getAnnouncements } from "../../../services/discussion.service";
import { Skeleton } from "@mui/material";
import AddAnnouncement from "./AddAnnouncement";

const Announcements = () => {
  const role = localStorage.getItem("role");
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.touches ? e.touches[0].pageX : e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    const x = e.touches ? e.touches[0].pageX : e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnnouncement = async () => {
    setLoading(true);
    try {
      const response = await getAnnouncements();
      setAnnouncement(response?.discussion?.posts);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  return (
    <section className="bg-white rounded-2xl px-4 py-4 mb-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <h1 className="font-poppins font-normal text-2xl leading-10 pt-0">
          Announcement
        </h1>
        {role === 'admin' && <span className="cursor-pointer" onClick={handleOpen}>
          <AddIcon color="action" />
        </span>}
      </div>
      <div
        className="flex overflow-x-auto gap-2 hide-scrollbar"
        ref={carouselRef}
        onTouchStart={handleMouseDown}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <Skeleton key={index} variant="rounded" width={600} height={128} />
          ))
        ) : (
          announcement?.map((ann, i) => (
            ann?.attachments?.map((att, j) => (
              <img className="w-96 h-32  rounded-xl" key={`${i}-${j}`} src={att} alt="Announcement" />
            ))
          ))
        )}
      </div>
      <AddAnnouncement isOpen={isOpen} onClose={handleClose} fetchAnnouncement={fetchAnnouncement} />
    </section>
  );
};

export default Announcements;
