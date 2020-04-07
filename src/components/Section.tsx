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
    <Title>{title}</Title>
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
  @media (min-width: 960px) {
    padding: 8rem 0;
  }
`;

const Title = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 2.2rem;
  margin: 0 0 3rem 0;
  text-align: center;
  letter-spacing: -0.05rem;
  @media (min-width: 980px) {
    width: 96rem;
    font-size: 2.4rem;
    padding-bottom: 1.6rem;
    margin: 0 0 4rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
  }
`;
