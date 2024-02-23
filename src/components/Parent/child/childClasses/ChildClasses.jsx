import React from "react";
import ChildClassesCard from "./ChildClassesCard";
const ChildClasses = () => {
  return (
    <div className="flex flex-col pb-2 gap-y-2  w-full">
      <ChildClassesCard/>
      <ChildClassesCard/>
      <ChildClassesCard/>
      <ChildClassesCard/>
      <ChildClassesCard/>
    </div>
  );
};

export default ChildClasses;
