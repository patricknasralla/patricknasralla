import React from 'react';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { LogoContainer, Title } from '../components/HeroLogo';
import { Logo } from '../assets/svg';
import SEO from '../components/seo';

export default () => (
  <Layout>
    <SEO title={'My CV'} description={'CV of Dr. Patrick Nasralla'} />
    <TitleSection>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Title>Patrick Nasralla</Title>
    </TitleSection>
    <PersonalStatementSection>
      <TextContainer>
        <PersonalStatementText>
          A creative and driven full-stack engineer with a passion for data
          representation. My goal is to create innovative and unique user
          experiences as part of a cutting-edge team.
        </PersonalStatementText>
      </TextContainer>
    </PersonalStatementSection>
    <Section title={'Core Skills'}>
      <TextContainer>
        <ul>
          <li>
            Programming languages including Javascript/Typescript; C#/C++;
            WebGL/GLSL.
          </li>
          <li>
            JS frameworks including React/Redux/Hooks, GraphQL, ThreeJS, Gatsby
            and Jest.
          </li>
          <li>
            Experience with Git, Git-flow and working with version control
            systems.
          </li>
          <li>Web Design: HTML, CSS and CSS in JS frameworks.</li>
          <li>
            Excellent knowledge of graphic design, layout and colour theory.
          </li>
          <li>Strong communication and team skills.</li>
        </ul>
      </TextContainer>
    </Section>
    <Section title={'work history'}>
      <WorkEntryContainer>
        <WorkEntryText>Software Developer, KPV Lab.</WorkEntryText>
        <WorkCircleLarge />
        <WorkEntryDate>2020 - Present</WorkEntryDate>
      </WorkEntryContainer>
      <TextContainer>
        <WorkDescription>
          Edinburgh based data visualisation company.
        </WorkDescription>
        <ul>
          <li>
            Working in React and Three JS to build a next generation data visualisation tool.
          </li>
          <li>
            Have helped architect and refine many aspects of the custom code base.
          </li>
          <li>
            Worked to speed up render pipline with custom GLSL shader code to offload computation 
            to the GPU.
          </li>
        </ul>
      </TextContainer>
      <WorkCircleSmall />
      <WorkEntryLine />
      <WorkEntryContainer>
        <WorkEntryText>Founder, Tr33llion Ltd.</WorkEntryText>
        <WorkCircleLarge />
        <WorkEntryDate>2017 - 2020</WorkEntryDate>
      </WorkEntryContainer>
      <TextContainer>
        <WorkDescription>
          Edinburgh based start-up building a tree-based technical document
          framework.
        </WorkDescription>
        <ul>
          <li>
            Implemented an n-ary tree based framework for display and storage of
            text based documents.
          </li>
          <li>
            Created a front-end application utilising the above framework to
            tag, save and search medical notes.
          </li>
          <li>
            Developed a bespoke system for tree traversal within a text editor
            allowing a user to create deeply nested and tagged documents simply
            by typing.
          </li>
          <li>
            Managed the business side of a startup. Pitching to pre-seed
            investors and day to day administration and organisation.
          </li>
        </ul>
      </TextContainer>
      <WorkCircleSmall />
      <WorkEntryLine />
      <WorkEntryContainer>
        <WorkEntryText>Medical Doctor, NHS Lothian.</WorkEntryText>
        <WorkCircleLarge />
        <WorkEntryDate>2015 - 2019</WorkEntryDate>
      </WorkEntryContainer>
      <TextContainer>
        <WorkDescription>
          NHS doctor. Working mainly in Emergency Medicine as part of the
          A&amp;E Department at the Royal Infirmary, Edinburgh.
        </WorkDescription>
        <ul>
          <li>
            Developed valuable team working skills in a high pressure
            environment.
          </li>
          <li>
            Excellent interpersonal skills: explaining difficult concepts and
            defusing situations.
          </li>
          <li>
            Public speaking and presentation experience. Delivered multiple
            conference presentations.
          </li>
          <li>
            Managed diverse teams with varying skill-sets to provide patient
            care on wards and in the Emergency Department.
          </li>
        </ul>
      </TextContainer>
      <WorkCircleSmall />
      <WorkEntryLine />
      <WorkEntryContainer>
        <WorkEntryText>Creative Director, Smileyoureyesoff Ltd.</WorkEntryText>
        <WorkCircleLarge />
        <WorkEntryDate>2008 - 2011</WorkEntryDate>
      </WorkEntryContainer>
      <TextContainer>
        <WorkDescription>
          London based design firm. Specialising in bespoke Adobe Flash
          Websites.
        </WorkDescription>
        <ul>
          <li>
            Built interactive websites and games for various clients including:
            the Royal National Institute of Blind People, the Wellcome Trust,
            the Royal Festival Hall and Nestle Purina.
          </li>
          <li>
            Worked closely with our lead developer to ensure that projects
            deployed rapidly, to spec and to high standard.
          </li>
          <li>Created a unique branding and design system for the company.</li>
        </ul>
      </TextContainer>
      <WorkCircleSmall />
      <WorkEntryLine />
      <WorkEntryContainer>
        <WorkEntryText>
          Lead graphic and web designer, Biomed Central Ltd.
        </WorkEntryText>
        <WorkCircleLarge />
        <WorkEntryDate>2006 - 2008</WorkEntryDate>
      </WorkEntryContainer>
      <TextContainer>
        <WorkDescription>
          London based open-access publishing firm.
        </WorkDescription>
        <ul>
          <li>HTML, CSS, PHP and JS experience.</li>
          <li>
            Managed design projects and product launches for various journals
            and exhibitions.
          </li>
          <li>
            Created a new company style guide and design systems/documentation.
          </li>
        </ul>
      </TextContainer>
    </Section>
    <Section title="education">
      <TextContainer>
        <p>
          <strong>2015: MBBS Medicine</strong>, University of Nottingham{' '}
        </p>
        <p>
          <strong>
            2006: MSc Psychoacoustics and Music Information Technology (Merit)
          </strong>
          , City University London{' '}
        </p>
        <p>
          <strong>2005: BSc(Hons) Neuroscience, 2:1</strong>, University College
          London
        </p>
      </TextContainer>
    </Section>
    <Section title="personal-projects">
      <TextContainer>
        <h3 id="coronavirus-3d-visualisation-www.covid19visualiser.com">
          Coronavirus 3D visualisation:{' '}
          <a href="https://covid19visualiser.com/">www.covid19visualiser.com</a>
        </h3>
        <ul>
          <li>
            A bespoke, interactive 3D visualisation of global COVID-19
            cumulative cases and reported deaths.
          </li>
          <li>Built in React, ThreeJS and GLSL.</li>
          <li>
            Uses a custom GLSL shader to dynamically move over 300,000 particles
            to display cases/deaths over time using data from international
            datasets.
          </li>
          <li>
            Created a novel algorithm for transforming 32bit floating point data
            to RGBA texture for use in the shader.
          </li>
          <li>
            Developed a custom weighting algorithm to triangulate closest
            geographical points based on Lat/Long data to each particle on the
            sphere.
          </li>
        </ul>
        <h3 id="personal-blog-www.patricknasralla.com">
          Personal Blog:{' '}
          <a href="https://www.patricknasralla.com">www.patricknasralla.com</a>
        </h3>
        <ul>
          <li>Static site built in React using Gatsby and GraphQL.</li>
          <li>Designed from scratch using custom css and typography.</li>
        </ul>
      </TextContainer>
    </Section>
    <Section title={''}>
      <TextContainer>
        <p>References available on request.</p>
      </TextContainer>
    </Section>
  </Layout>
);

const PersonalStatementSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 0;
  @media (min-width: 980px) {
    padding: 8rem 0;
  }
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8rem 0 4rem 0;
  @media (min-width: 980px) {
    padding: 10rem 0 5rem 0;
  }
`;

const TextContainer = styled.div`
  width: 30rem;
  font-family: 'Libre Baskerville', serif;
  margin: 0;
  @media (min-width: 375px) {
    width: 35rem;
  }
  @media (min-width: 768px) {
    width: 72rem;
  }
`;

const PersonalStatementText = styled.p`
  hyphens: none;
  letter-spacing: -0.01rem;
  font-weight: 400;
  font-size: 1.7rem;
  text-align: center;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.highlight};
  margin: 0;
  padding: 0;
  @media (min-width: 768px) {
    font-size: 1.8rem;
    line-height: 2.5rem;
  }
  @media (min-width: 980px) {
    font-size: 1.9rem;
    line-height: 2.6rem;
  }
`;

const WorkCircleLarge = styled.div`
  height: 8rem;
  border-left: ${({ theme }) => theme.highlight} solid 1px;
  margin: 0 2rem 0 0;
  @media (min-width: 768px) {
    width: 6rem;
    height: 6rem;
    border: ${({ theme }) => theme.highlight} solid 1px;
    border-radius: 4rem;
    margin: 0 2rem;
  }
`;

const WorkCircleSmall = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
    border: ${({ theme }) => theme.highlight} solid 1px;
    width: 1rem;
    height: 1rem;
    border-radius: 2rem;
  }
  margin: 0 auto;
`;

const WorkEntryLine = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
    width: 0;
    height: 8rem;
    margin: 0 auto;
    border-left: ${({ theme }) => theme.highlight} solid 1px;
  }
`;

const WorkEntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: 767px) {
    margin-top: 3rem;
  }
`;

const WorkEntryText = styled.h3`
  margin: 0;
  padding: 0;
  width: 17rem;
  @media (min-width: 768px) {
    text-align: right;
    width: 30rem;
  }
`;

const WorkEntryDate = styled(WorkEntryText)`
  width: 8rem;
  @media (min-width: 768px) {
    text-align: left;
    width: 30rem;
  }
`;

const WorkDescription = styled.p`
  color: ${({ theme }) => theme.highlight};
`;
