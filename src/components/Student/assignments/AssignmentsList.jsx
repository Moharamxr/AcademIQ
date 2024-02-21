import styled from '@emotion/styled';
import React, { useState } from 'react';
const TodoListContainer = styled("div")({
    maxHeight: "36.3rem",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0",
      background: "transparent",
    },
  });
  const FixedTopContent = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
  `;
const AssignmentsList = () => {
    const [assignmentStatus ,setAssignmentStatus] = useState('Active');
  return (
    <TodoListContainer className='bg-white flex flex-col justify-center items-center p-3 pt-0 rounded-xl'>
        <FixedTopContent className=' bg-white py-3 w-full'>
            <select value={assignmentStatus} onChange={(e)=>setAssignmentStatus(e.target.value)} className='w-full outline-none border border-gray-200 rounded-lg h-12 text-xl p-2 ps-1 font-normal '>
            <option value="Active" >Active</option>
            <option value="Active">Active</option>
            <option value="Active">Active</option>
        </select>
        </FixedTopContent>
        
        <div className="flex flex-col py-4 gap-2 px-3 w-full max-h-[36.3rem] pt-11">
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
            <div className="bg-gray-100 rounded-lg w-full p-2">
                <div className="between">
                    <p className='text-lg font-normal '>Arabic <span className='text-gray-500 text-sm'>Mrs.Nada ahmed</span></p>
                    <time className='text-xs'>08:00 PM</time>
                </div>
                <article className='text-gray-700'>I want to  view the titles of tasks or assignments assigned by my teacher...</article>
            </div>
        </div>
    </TodoListContainer>
  );
}

export default AssignmentsList;
