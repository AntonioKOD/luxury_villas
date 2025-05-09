import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper suppressHydrationWarning>
      <button className='text-background'>View Villas</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    z-index: 2;
    display: block;
    width: fit-content;
    height: auto;
    outline: none;
    border: none;
    background-color: inherit;
    font-size: 24px;
    font-weight: bold;
    padding: 10px 20px;
    position: relative;
    cursor: pointer;
  }

  button::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    z-index: 3;
    position: absolute;
    top: 0%;
    left: 0%;
    transform: scaleX(0.2) scaleY(0.5) translate(250%, 100%);
    border-top: solid 2px background;
    border-left: solid 4px background;
    transition: all .4s ease-in-out;
  }

  button::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%) scaleX(0.2) scaleY(0.5);
    border-bottom: solid 2px background;
    border-right: solid 4px background;
    transition: all .4s ease-in-out;
  }

  button:hover::before {
    transform: translate(0%, 0%) scaleX(1) scaleY(1);
    border-top: solid 1px background;
    border-left: solid 1px background;
  }

  button:hover::after {
    transform: scaleX(1) scaleY(1) translate(0%, 0%);
    border-bottom: solid 1px background;
    border-right: solid 1px background;
  }`;

export default Button;
