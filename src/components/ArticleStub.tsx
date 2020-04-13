import React from 'react';
import styled from 'styled-components';

interface ArticleStub {
  type: string;
  title: string;
  excerpt: string;
}

interface ColorByType {
  type: string;
}

export const ArticleStub: React.FC<ArticleStub> = ({
  type,
  title,
  excerpt,
}) => (
  <Wrapper>
    <Box type={type} />
    <TextContainer type={type}>
      <FrontMatter type={type}>
        <Title>{title}</Title>
        <Excerpt>{excerpt}</Excerpt>
      </FrontMatter>
    </TextContainer>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  margin-bottom: 4rem;
  width: 100%;

  :hover {
    background: ${({ theme }) => theme.backgroundHighlight};
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Box = styled.div<ColorByType>`
  display: none;
  @media (min-width: 768px) {
    display: block;
    width: 2rem;
    height: 2rem;
    background-color: ${({ type, theme }) =>
      type === 'essay'
        ? theme.brightBlue
        : type === 'tutorial'
        ? theme.brightYellow
        : type === 'project'
        ? theme.brightCyan
        : type === 'other'
        ? theme.brightGreen
        : theme.brightPurple};
  }
`;

const TextContainer = styled.div<ColorByType>`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    border-top: none;
    border-left: 1px solid
      ${({ type, theme }) =>
        type === 'essay'
          ? theme.brightBlue
          : type === 'tutorial'
          ? theme.brightYellow
          : type === 'project'
          ? theme.brightCyan
          : type === 'other'
          ? theme.brightGreen
          : theme.brightPurple};
    padding: 0 0 0 2rem;
  }
`;

const FrontMatter = styled.div<ColorByType>`
  width: 30rem;
  border-top: 1px solid
    ${({ type, theme }) =>
      type === 'essay'
        ? theme.brightBlue
        : type === 'tutorial'
        ? theme.brightYellow
        : type === 'project'
        ? theme.brightCyan
        : type === 'other'
        ? theme.brightGreen
        : theme.brightPurple};
  padding-top: 1rem;
  @media (min-width: 375px) {
    width: 35rem;
  }
  @media (min-width: 768px) {
    width: 60rem;
    padding: 0;
    border-top: none;
  }
  @media (min-width: 980px) {
    width: 72rem;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.highlight};
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.03rem;
  margin: 0;
  font-weight: 500;
  font-size: 1.6rem;
  @media (min-width: 980px) {
    font-size: 2rem;
  }
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.mainBright};
  font-family: 'Libre Baskerville', serif;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.01rem;
  margin: 0.4rem 0 0.2rem 0;
  font-size: 1.4rem;
  @media (min-width: 980px) {
    margin: 0.5rem 0 0.25rem;
    font-size: 1.6rem;
  }
`;
