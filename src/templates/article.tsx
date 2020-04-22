import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Layout } from '../components/Layout';

export default ({ data }: any) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <LeadImage fluid={post.frontmatter.titleImage.childImageSharp.fluid} />
      <PageContainer>
        <TitleContainer>
          <Title type={post.frontmatter.type}>{post.frontmatter.title}</Title>
          <Date type={post.frontmatter.type}>{post.frontmatter.date}</Date>
        </TitleContainer>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </PageContainer>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        type
        date(formatString: "DD/MM/YYYY")
        titleImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

// styled components
interface IColorByType {
  type: string;
}

const PageContainer = styled.div`
  width: 300px;
  margin: 3rem auto;
  @media (min-width: 375px) {
    width: 350px;
  }
  @media (min-width: 768px) {
    width: 660px;
  }
  @media (min-width: 980px) {
    width: 720px;
  }
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 5;
  height: 80vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (min-width: 375px) {
  }
  @media (min-width: 768px) {
    height: 70vh;
  }
  @media (min-width: 980px) {
  }
`;

const Title = styled.h1<IColorByType>`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background}AA;
  color: ${({ theme }) => theme.highlight};
  border-right: 0.5rem solid
    ${({ type, theme }) =>
      type === 'essay'
        ? theme.brightPurple
        : type === 'tutorial'
        ? theme.brightYellow
        : type === 'project'
        ? theme.brightCyan
        : type === 'other'
        ? theme.brightGreen
        : theme.brightBlue};
  font-size: 3rem;
  max-width: 32rem;
  @media (min-width: 375px) {
    font-size: 3.5rem;
    max-width: 35rem;
  }
  @media (min-width: 768px) {
    font-size: 4rem;
    max-width: 72rem;
  }
  @media (min-width: 980px) {
    font-size: 4.5rem;
  }
`;

const Date = styled.h3<IColorByType>`
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.background}AA;
  padding: 0.5rem;
  margin: 0;
  color: ${({ type, theme }) =>
    type === 'essay'
      ? theme.brightPurple
      : type === 'tutorial'
      ? theme.brightYellow
      : type === 'project'
      ? theme.brightCyan
      : type === 'other'
      ? theme.brightGreen
      : theme.brightBlue};
`;

const LeadImage = styled(Img)`
  //   phone display
  position: absolute;
  top: 0;
  height: 80vh;
  overflow-x: hidden;
  @media (min-width: 768px) {
    height: 70vh;
  }
  @media (min-width: 980px) {
  }
`;
