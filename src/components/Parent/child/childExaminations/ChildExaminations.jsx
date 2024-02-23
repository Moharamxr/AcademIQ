import React from 'react'
import ChildExaminationsCard from './ChildExaminationsCard'

const ChildExaminations = () => {
  return (
    <div className="flex flex-col pb-2 gap-y-3  w-full">
    <div className="flex flex-row-reverse gap-x-1">
      <select
        name="days"
        id="childAssYear"
        className="border border-active-br outline-none rounded-md text-active px-px text-sm font-poppins font-normal"
      >
        <option value="1">Year</option>
        <option value="2024">2024</option>
      </select>
      <select
        name="days"
        id="childAssMonth"
        className="border border-active-br outline-none rounded-md text-active px-px text-sm font-poppins font-normal"
      >
        <option value="1">Month</option>
        <option value="1">Jan</option>
      </select>
      <select
        name="days"
        id="childAssDays"
        className="border border-active-br outline-none rounded-md text-active px-px text-sm font-poppins font-normal"
      >
        <option value="1">Day</option>
        <option value="1">1</option>
      </select>
    </div>
    <ChildExaminationsCard />
    <ChildExaminationsCard />
    <ChildExaminationsCard />
  </div>
  )
}

export default ChildExaminations