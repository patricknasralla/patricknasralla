import React from 'react';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import { Logo } from '../assets/svg';

export default () => (
  <Layout>
    <PageContainer>
      <MessageContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <TextContainer>
          <h1>Oops... Page Not Found!</h1>
          <p>
            I'm afraid the page you're looking for doesn't seem to exist! Try a
            link at the top instead.
          </p>
        </TextContainer>
      </MessageContainer>
    </PageContainer>
  </Layout>
);

const PageContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 756px) {
    flex-direction: row;
  }
`;

const LogoContainer = styled.div`
  width: 100px;
  height: 100px;
  fill: ${({ theme }) => theme.highlight};
  stroke: ${({ theme }) => theme.highlight};
  margin: 3rem;
  @media (min-width: 756px) {
    margin-right: 6rem;
  }
`;

const TextContainer = styled.div`
  margin-top: 1rem;
  width: 90%;
  text-align: center;
  @media (min-width: 756px) {
    width: 50%;
    text-align: left;
  }
`;
