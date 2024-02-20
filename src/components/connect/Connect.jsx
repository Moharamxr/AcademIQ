import React from 'react'
import ConnectList from './ConnectList'
import ConnectChat from './ConnectChat'

const Connect = () => {
  return (
    <div className='w-full flex md:flex-row flex-col gap-x-4 '>
        <ConnectList />
        <ConnectChat />
    </div>
  )
}

export default Connect