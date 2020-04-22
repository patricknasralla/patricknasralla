import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import { ArticleStub } from '../components/ArticleStub';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';

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
      <Section title={'Articles'}>
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

export const query = graphql`
  query GetAllArticles {
    allMarkdownRemark(sort: { fields: frontmatter___date }) {
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

const ArticleLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;
