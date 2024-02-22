import React from 'react'
import Teacher from '../../../assets/connect-teatcher (1).png';
const ChildClasses = () => {
  return (
    <div className='flex flex-col py-3 px-4 w-full'>
      <div className="bg-gray-100 rounded-lg between p-3 ">
        <div className="flex gap-3">
          <img src={Teacher} alt="Teacher"className='w-14 h-14' />
          <div className="flex flex-col">
          <h4 class="font-semibold text-lg leading-9 font-poppins">Arabic</h4>
          <p class="font-poppins font-normal text-sm leading-6">Guy Hawkins</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ChildClasses;