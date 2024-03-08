import React, { useState, useRef } from "react";
import RightCursor from "../../../assets/icons/RightCursor";
import GradParty from "../../../assets/announcments/Frame 427318224.png";
import SocialActivities from "../../../assets/announcments/Frame 427318225.png";

const Announcements = () => {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(
      e.touches ? e.touches[0].pageX : e.pageX - carouselRef.current.offsetLeft
    );
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
    // e.preventDefault();
    const x = e.touches
      ? e.touches[0].pageX
      : e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 3; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-white rounded-2xl  px-4 py-4 mb-4 overflow-hidden">
      <div className="between">
        <h1 className="font-poppins font-normal text-2xl leading-10 pt-0">
          Announcement
        </h1>
        <RightCursor className="hover:bg-slate-100 rounded-md" />
      </div>
      <div
        className="flex overflow-x-hidden gap-2"
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
        <img className="w-72 h-w-32 " src={GradParty} alt="GradParty" />
      
        <img
          className="w-72 h-w-32 "
          src={SocialActivities}
          alt="SocialActivities"
        />
        <img
          className="w-72 h-w-32 "
          src={SocialActivities}
          alt="SocialActivities"
        />
        <img
          className="w-72 h-w-32 "
          src={SocialActivities}
          alt="SocialActivities"
        />
        <img
          className="w-72 h-w-32 "
          src={SocialActivities}
          alt="SocialActivities"
        />
        <img
          className="w-72 h-w-32 "
          src={SocialActivities}
          alt="SocialActivities"
        />
        <img
          className="w-72 h-w-32 "
          src={SocialActivities}
          alt="SocialActivities"
        />
       
      </div>
    </section>
  );
};

export default Announcements;
