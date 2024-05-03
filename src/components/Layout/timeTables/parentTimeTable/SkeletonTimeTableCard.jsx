import { Skeleton } from '@mui/material'
import React from 'react'

const SkeletonTimeTableCard = () => {
  return (
    <div className='between'>
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='rounded' width={300} height={50} />
    </div>
  )
}

export default SkeletonTimeTableCard