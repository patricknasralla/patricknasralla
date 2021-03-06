import React from 'react';
import styled from 'styled-components';
import { GitHub, LinkedIn, Twitter } from '../assets/svg';

export const SocialIcons = () => (
  <IconContainer>
    <Icon href={'https://twitter.com/GomiNoSensei'}>
      <Twitter />
    </Icon>
    <Icon href={'https://www.linkedin.com/in/patricknasralla/'}>
      <LinkedIn />
    </Icon>
    <Icon href={'https://github.com/patricknasralla'}>
      <GitHub />
    </Icon>
  </IconContainer>
);

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0.8rem 0 0 0;
  width: 30rem;
  @media (min-width: 375px) {
    width: 35rem;
  }
  @media (min-width: 768px) {
    margin: 1rem 0 0 0;
    width: 72rem;
  }
`;

const Icon = styled.a`
  width: 24px;
  height: 24px;
  :hover {
    fill: #008eff;
  }
`;
