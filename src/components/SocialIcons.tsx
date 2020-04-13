import React from 'react';
import styled from 'styled-components';
import { GitHub, LinkedIn, Twitter } from '../assets/svg';

export const SocialIcons = () => (
  <IconContainer>
    <Icon>
      <Twitter />
    </Icon>
    <Icon>
      <LinkedIn />
    </Icon>
    <Icon>
      <GitHub />
    </Icon>
  </IconContainer>
);

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0.8rem 0 0 0;
  width: 30rem;
  @media (min-width: 375px) {
    width: 35rem;
  }
  @media (min-width: 768px) {
    margin: 1rem 0 0 0;
    width: 96rem;
  }
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 3rem;
  //@media (min-width: 375px) {
  //  margin: 0 5rem;
  //}
  @media (min-width: 980px) {
    margin: 0 10rem;
  }
`;
