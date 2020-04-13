import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { ArticleStub } from '../components/ArticleStub';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { HeroLogo } from '../components/HeroLogo';
import { SocialIcons } from '../components/SocialIcons';

interface IProps {
  data: any;
}

export default ({ data }: IProps) => {
  return (
    <Layout>
      <HeroLogo />
      <Section title={'About'} highlight={true}>
        <AboutText>
          <p>
            This is some centred text about me and stuff. I like the Libre
            Baskerville and Montserrat crossover... it's probably going to be
            one or two paragraphs long eventually. So I'm going to write
            something about that length for space filling reasons.
          </p>
          <p>
            Paragraph two is likely going to be a little shorter and maybe
            feature a link to my CV or something.
          </p>
        </AboutText>
        <SocialIcons />
      </Section>
      <Section title={'Recent Articles'}>
        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <ArticleLink key={node.id} to={node.fields.slug}>
            <ArticleStub
              key={node.id}
              type={node.frontmatter.type}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
            />
          </ArticleLink>
        ))}
      </Section>
    </Layout>
  );
};

// GraphQL
export const query = graphql`
  query GetRecentArticles {
    allMarkdownRemark(limit: 10, sort: { fields: frontmatter___date }) {
      edges {
        node {
          id
          frontmatter {
            title
            type
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;

// Single Use Styles
const AboutText = styled.div`
  width: 30rem;
  font-family: 'Libre Baskerville', serif;
  margin: 0 0 3rem 0;
  p {
    letter-spacing: -0.01rem;
    font-weight: 400;
    font-size: 1.6rem;
    text-align: center;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.highlight};
    margin: 0;
    padding: 0;
  }
  @media (min-width: 375px) {
    width: 35rem;
  }
  @media (min-width: 768px) {
    width: 72rem;
    margin: 0 0 4rem 0;
    p {
      font-size: 1.7rem;
      line-height: 2.5rem;
    }
  }
  @media (min-width: 980px) {
    p {
      font-size: 1.8rem;
      line-height: 2.6rem;
    }
  }
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;
