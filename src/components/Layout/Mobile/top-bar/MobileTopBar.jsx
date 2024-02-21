import styled from '@emotion/styled';
import React from 'react'
import ThreeBarIcon from '../../../../assets/icons/ThreeBarIcon';
import Logo from '../../../../assets/Logo';
import NotificationIcon from '../../../../assets/icons/NotificationIcon';

const FixedTopContent = styled.div`
  position: fixed;
  top: 0;
  z-index: 30;
`;

const MobileTopBar = () => {
  return (
    <FixedTopContent className='container between p-3 md:hidden bg-white min-w-full rounded'>
      <div >
        <ThreeBarIcon />
      </div>
      <div >
        <Logo />
      </div>
      <div className='pe-2'>
        <NotificationIcon />
      </div>
    </FixedTopContent>
  )
}

export default MobileTopBar