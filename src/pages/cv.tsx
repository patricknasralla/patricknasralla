import React from 'react';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { AboutText } from './index';

export default () => (
  <Layout>
    <Section title="personal-statement" highlight={true}>
      <StyledPersonalStatement>
        <p>
          A creative and driven full-stack engineer with a passion for data
          representation. My goal is to create innovative and unique user
          experiences as part of a cutting-edge team.
        </p>
      </StyledPersonalStatement>
    </Section>
    <Section title={'Core Skills'}>
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
    </Section>
    <h2 id="work-history">Work History:</h2>
    <h3 id="present-founder-tr33llion-ltd.">
      2017 - present: Founder, Tr33llion Ltd.
    </h3>
    <p>
      Edinburgh based start-up building a tree-based technical document
      framework.
    </p>
    <ul>
      <li>
        Implemented an n-ary tree based framework for display and storage of
        text based documents.
      </li>
      <li>
        Created a front-end application utilising the above framework to tag,
        save and search medical notes.
      </li>
      <li>
        Developed a bespoke system for tree traversal within a text editor
        allowing a user to create deeply nested and tagged documents simply by
        typing.
      </li>
      <li>
        Managed the business side of a startup. Pitching to pre-seed investors
        and day to day administration and organisation.
      </li>
    </ul>
    <h3 id="medical-doctor-nhs-lothian.">
      2015 - 2019: Medical Doctor, NHS Lothian.
    </h3>
    <p>
      NHS doctor. Working mainly in Emergency Medicine as part of the A&amp;E
      Department at the Royal Infirmary, Edinburgh.
    </p>
    <ul>
      <li>
        Developed valuable team working skills in a high pressure environment.
      </li>
      <li>
        Excellent interpersonal skills: explaining difficult concepts and
        defusing situations.
      </li>
      <li>
        Public speaking and presentation experience. Delivered multiple
        conference presentations.
      </li>
    </ul>
    <h3 id="creative-director-smileyoureyesoff-ltd.">
      2008 - 2011: Creative Director, Smileyoureyesoff Ltd.
    </h3>
    <p>
      London based design firm. Specialising in bespoke Adobe Flash Websites.
    </p>
    <ul>
      <li>
        Built interactive websites and games for various clients including: the
        Royal National Institute of Blind People, the Wellcome Trust, the Royal
        Festival Hall and Nestle Purina.
      </li>
      <li>
        Worked closely with our lead developer to ensure that projects deployed
        rapidly, to spec and to high standard.
      </li>
      <li>Created a unique branding and design system for the company.</li>
    </ul>
    <h3 id="lead-graphic-and-web-designer-biomed-central-ltd.">
      2006 - 2008: Lead graphic and web designer, Biomed Central Ltd.
    </h3>
    <p>London based open-access publishing firm.</p>
    <ul>
      <li>HTML, CSS, PHP and JS experience.</li>
      <li>
        Managed design projects and product launches for various journals and
        exhibitions.
      </li>
      <li>
        Created a new company style guide and design systems/documentation.
      </li>
    </ul>
    <h2 id="education">Education:</h2>
    <p>
      2015: MBBS Medicine, University of Nottingham 2006: MSc Psychoacoustics
      and Music Information Technology (Merit), City University London 2005:
      BSc(Hons) Neuroscience, 2:1, University College London
    </p>
    <h2 id="personal-projects">Personal Projects:</h2>
    <h3 id="coronavirus-3d-visualisation-www.covid19visualiser.com">
      Coronavirus 3D visualisation: www.covid19visualiser.com
    </h3>
    <ul>
      <li>
        A bespoke, interactive 3D visualisation of global COVID-19 cumulative
        cases and reported deaths.
      </li>
      <li>Built in React, ThreeJS and GLSL.</li>
      <li>
        Uses a custom GLSL shader to dynamically move over 300,000 particles to
        display cases/deaths over time using data from international datasets.
      </li>
      <li>
        Created a novel algorithm for transforming 32bit floating point data to
        RGBA texture for use in the shader.
      </li>
      <li>
        Developed a custom weighting algorithm to triangulate closest
        geographical points based on Lat/Long data to each particle on the
        sphere.
      </li>
    </ul>
    <h3 id="personal-blog-www.patricknasralla.com">
      Personal Blog: www.patricknasralla.com
    </h3>
    <ul>
      <li>Static site built in React using Gatsby and GraphQL.</li>
      <li>Designed from scratch using custom css and typography.</li>
    </ul>
    <hr />
    <p>Reference available on request.</p>
  </Layout>
);

const PageStyles = styled.div`
  width: 32rem;
  margin: 3rem auto;
  h4 {
    text-align: right;
  }
  @media (min-width: 375px) {
    width: 37.5rem;
  }
  @media (min-width: 768px) {
    width: 72rem;
  }
  @media (min-width: 960px) {
    width: 96rem;
  }
`;

const StyledPersonalStatement = styled.p`
  width: 30rem;
  font-family: 'Libre Baskerville', serif;
  margin: 0;
  p {
    hyphens: none;
    letter-spacing: -0.01rem;
    font-weight: 400;
    font-size: 1.7rem;
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
    margin: 0;
    p {
      font-size: 1.8rem;
      line-height: 2.5rem;
    }
  }
  @media (min-width: 980px) {
    p {
      font-size: 1.9rem;
      line-height: 2.6rem;
    }
  }
`;
