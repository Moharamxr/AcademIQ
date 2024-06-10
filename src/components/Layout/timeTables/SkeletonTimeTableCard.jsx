import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonTimeTableCard = () => {
  return (
    <div className='flex gap-3'>
      <Skeleton variant='circular' width={57} height={50} />
      <Skeleton variant='rounded' height={50} width="100%" />
    </div>
  );
};

export default SkeletonTimeTableCard;
