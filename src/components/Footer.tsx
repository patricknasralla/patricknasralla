import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

export const Footer = () => (
  <>
    <FooterContainer>
      <p>©2020 Patrick Nasralla.</p>
      <p />
      <p />
      <Link to={'/disclaimer'}>
        <p>Legal Stuff.</p>
      </Link>
      <p>
        Made with <a href="https://www.gatsbyjs.org/">Gatsby</a>.
      </p>
    </FooterContainer>
  </>
);

const FooterContainer = styled.div`
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: solid 1px ${({ theme }) => theme.highlight};
  width: 32rem;
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    margin-top: 0.6rem;
  }
  @media (min-width: 375px) {
    width: 37.5rem;
  }
  @media (min-width: 768px) {
    width: 72rem;
    p {
      margin: 1rem 0.5rem 0 0.5rem;
      font-size: 1.2rem;
    }
  }
  @media (min-width: 980px) {
    width: 96rem;
    p {
      font-size: 1.3rem;
    }
  }
`;
