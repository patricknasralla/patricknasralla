import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { ArticleStub } from '../components/ArticleStub';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { HeroLogo } from '../components/HeroLogo';
import { SocialIcons } from '../components/SocialIcons';
import SEO from '../components/seo';

interface IProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            title: string;
            type: string;
          };
          excerpt: string;
          fields: {
            slug: string;
          };
        };
      }[];
    };
  };
}

export default ({ data }: IProps) => {
  return (
    <Layout>
      <SEO title={'Home'} description={'patricknasralla.com'} />
      <HeroLogo />
      <Section title={'About Me'} highlight={true}>
        <AboutText>
          <p>
            I am the founder of Tr33llion Ltd. As a software engineer and
            clinician, I create software that addresses the disconnect users
            have with existing medical note taking systems.
          </p>
          <p>
            User experience and data representation play an important role in
            our ability to perceive and interact with data. I passionately
            believe it's a combination of these two things that makes great
            software.
          </p>
          <p>
            This site is for my personal writing, tutorials and opinions. My
            hope is that people can benefit from the things I learn!
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
export const AboutText = styled.div`
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
  p + p {
    margin-top: 3rem;
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
