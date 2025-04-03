'use client'
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes for animations
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.01);
  }
  100% {
    transform: scale(1);
  }
`;

const fade = keyframes`
  0% { background: #252525; }
  50% { background: #000; }
  100% { background: #353535; }
`;

// Styled component for the loader animation
const LoaderWrapper = styled.div`
  .socket {
    width: 200px;
    height: 200px;
    position: relative;
  }

  .circle {
    background: #000;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${fade} 2s infinite;
  }

  .gel {
    height: 30px;
    width: 30px;
    transition: all 0.3s;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .center-gel {
    margin-left: -15px;
    margin-top: -15px;
    animation: ${pulse} 2s infinite;
  }

  /* Example positions for some gels */
  .c1 {
    margin-left: -47px;
    margin-top: -15px;
  }

  .c2 {
    margin-left: -31px;
    margin-top: -43px;
  }

  .c3 {
    margin-left: 1px;
    margin-top: -43px;
  }

  .c4 {
    margin-left: 17px;
    margin-top: -15px;
  }

  /* You can add more positioning classes as needed */
`;

// Loader component (animation)
const Loader = () => (
  <LoaderWrapper>
    <div className="socket">
      <div className="gel center-gel">
        <div className="circle" />
      </div>
      <div className="gel c1">
        <div className="circle" />
      </div>
      <div className="gel c2">
        <div className="circle" />
      </div>
      <div className="gel c3">
        <div className="circle" />
      </div>
      <div className="gel c4">
        <div className="circle" />
      </div>
      {/* Add additional gels as needed */}
    </div>
  </LoaderWrapper>
);

// Full page container that centers the loader
const FullPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

// Loading page that uses the loader component
const LoadingPage = () => {
  return (
    <FullPageContainer>
      <Loader />
    </FullPageContainer>
  );
};

export default LoadingPage;