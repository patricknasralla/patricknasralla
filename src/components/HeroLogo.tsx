import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Logo } from '../assets/svg';

export const HeroLogo: React.FC = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      hero: file(relativePath: { eq: "assets/img/background.jpg" }) {
        childImageSharp {
          fluid {
            aspectRatio
            base64
            sizes
            src
            srcSet
          }
        }
      }
    }
  `);

  return (
    <>
      <Main>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Title>PATRICK NASRALLA</Title>
        <TagLine>Medical Doctor | Software Developer</TagLine>
      </Main>
      <HeroImage
        fluid={data.hero.childImageSharp.fluid}
        alt={'background image'}
      />
    </>
  );
};

const Main = styled.div`
  position: absolute;
  z-index: 10;
  height: 100vh;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeroImage = styled(Img)`
  height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  width: 65px;
  height: 65px;
  fill: ${({ theme }) => theme.highlight};
  stroke: ${({ theme }) => theme.highlight};
  @media (min-width: 980px) {
    width: 75px;
    height: 75px;
  }
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  letter-spacing: -0.05rem;
  text-transform: uppercase;
  font-size: 2.2rem;
  margin: 3rem 0 1.5rem 0;
  text-align: center;
  @media (min-width: 980px) {
    font-size: 2.4rem;
    margin: 4rem 0 2rem 0;
  }
`;

const TagLine = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  letter-spacing: -0.05rem;
  font-size: 1.6rem;
  margin: 0;
  text-align: center;
  @media (min-width: 980px) {
    font-size: 1.8rem;
    margin: 0;
  }
`;
