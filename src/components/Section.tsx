import React from 'react';
import styled from 'styled-components';

interface ISection {
  title: string;
  highlight?: boolean;
}

interface ISectionWrapper {
  highlight?: boolean;
}

export const Section: React.FC<ISection> = ({ title, highlight, children }) => (
  <SectionWrapper highlight={highlight}>
    <Title>
      <h1>{title}</h1>
    </Title>
    {children}
  </SectionWrapper>
);

const SectionWrapper = styled.div<ISectionWrapper>`
  width: 100%;
  background-color: ${({ theme, highlight }) =>
    highlight ? theme.backgroundHighlight : 'transparent'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 0;
  @media (min-width: 980px) {
    padding: 8rem 0;
  }
`;

export const Title = styled.div`
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  margin: 0 auto 3rem auto;
  text-align: center;
  width: 30rem;
  h1 {
    font-weight: 300;
    font-size: 2.2rem;
    letter-spacing: -0.05rem;
    margin: 0;
  }
  @media (min-width: 768px) {
    width: 72rem;
    padding-bottom: 1.4rem;
    margin: 0 0 3.5rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
    h1 {
      font-size: 2.3rem;
    }
  }
  @media (min-width: 980px) {
    width: 96rem;
    padding-bottom: 1.6rem;
    margin: 0 0 4rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
    h1 {
      font-size: 2.4rem;
    }
  }
`;
