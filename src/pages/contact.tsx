import React from 'react';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { EmailIcon, FaceBook, GitHub, LinkedIn, Twitter } from '../assets/svg';
import SEO from '../components/seo';

export default () => (
  <Layout>
    <SEO title={'Contact Me'} description={'Contact Page.'} />
    <Section title={'Contact'}>
      <ContactsContainer>
        <LinksContainer>
          <SingleLink>
            <h1>Twitter:</h1>
            <Icon href={'https://twitter.com/GomiNoSensei'}>
              <Twitter />
            </Icon>
          </SingleLink>
          <SingleLink>
            <h1>Facebook:</h1>
            <Icon href={'https://www.facebook.com/patrick.nasralla'}>
              <FaceBook />
            </Icon>
          </SingleLink>
          <SingleLink>
            <h1>LinkedIn:</h1>
            <Icon href={'https://www.linkedin.com/in/patricknasralla/'}>
              <LinkedIn />
            </Icon>
          </SingleLink>
          <SingleLink>
            <h1>GitHub:</h1>
            <Icon href={'https://github.com/patricknasralla'}>
              <GitHub />
            </Icon>
          </SingleLink>
          <SingleLink>
            <h1>Email:</h1>
            <MailIcon href={'mailto:patricknasralla@tr33llion.com'}>
              <EmailIcon />
            </MailIcon>
          </SingleLink>
        </LinksContainer>
      </ContactsContainer>
    </Section>
  </Layout>
);

const ContactsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.a`
  margin-left: 3rem;
  width: 100px;
  height: 100px;
  :hover {
    fill: #008eff;
  }
`;

const MailIcon = styled.a`
  margin-left: 3rem;
  width: 100px;
  stroke: ${({ theme }) => theme.highlight};
  :hover {
    stroke: #008eff;
  }
`;

const LinksContainer = styled.div``;

const SingleLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
`;
