import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Footer } from './Footer';
import { NavigationBar } from './Navigation';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: smooth;
    font-size: 62.5%;
  }
  html {
    overflow-x: hidden;
  }
  html, body {
    height: 100%;
    width: 100%;
    color: #DADDDF;
    background-color: ${({ theme }) => theme.background};
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
  }
  
  // Global Font and Typography styles for consistency
  h1, h2, h3 {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01rem; 
    color: ${({ theme }) => theme.highlight};
    line-height: 1.2;
    margin: 0;
    font-kerning: normal;
    -moz-font-feature-settings: "kern";
    -webkit-font-feature-settings: "kern";
    font-feature-settings: "kern";
  } 
  
  h1 {
    font-weight: 700;
    font-size: 2.4rem;
    margin: 0 0 1.2rem 0;
    @media (min-width: 768px) {
    font-size: 2.5rem;
    margin: 0 0 1.4rem 0;
    }
    @media (min-width: 980px) {
      margin: 0 0 1.6rem 0;
      font-size: 2.6rem;
    }
  }
  
  h2 {
    font-weight: 700;
    font-size: 2.0rem;
    margin: 0 0 0.6rem 0;
    @media (min-width: 768px) {
      font-size: 2.1rem;
      margin: 0 0 0.7rem 0;
    }
    @media (min-width: 980px) {
      margin: 0 0 0.8rem 0;
      font-size: 2.2rem;
    }
  }
  
  h3 {
    font-weight: 500;
    font-size: 1.7rem;
    margin: 0 0 0.6rem 0;
    @media (min-width: 768px) {
      font-size: 1.8rem;
      margin: 0 0 0.7rem 0;
    }
    @media (min-width: 980px) {
      margin: 0 0 0.8rem 0;
      font-size: 1.9rem;
    }
  }
  
  h4 {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    font-style: italic;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.highlight};
  }
  
  p, li {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.4;
    color: ${({ theme }) => theme.mainBright};
    margin: 0 0 0.6rem 0;
    hyphens: none;
    font-kerning: normal;
    -moz-font-feature-settings: "kern";
    -webkit-font-feature-settings: "kern";
    font-feature-settings: "kern";
    @media (min-width: 768px) {
      font-size: 1.7rem;
      margin: 0 0 0.7rem 0;
      hyphens: auto;
    }
    @media (min-width: 980px) {
      margin: 0 0 0.8rem 0;
      font-size: 1.8rem;
    }
  }
  
  ul, ol {
    margin: 3rem 0 3rem 0.8rem;
    padding: 0 0 0 2.0rem;
  }
  
  li {
    padding-left: 0.8rem;
  }
  
  li > ul, li > ol {
    margin: 0;
  }
  
  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.highlight};
  }
  
  em {
    font-style: italic;
  }
  
  a {
    // break long urls to stop the layout fucking up...
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    
    color: ${({ theme }) => theme.mainBright};
    :visited {
      color: ${({ theme }) => theme.mainBright};
    }
    :hover, :active {
      color: ${({ theme }) => theme.highlight};
    }
  }
  
  small {
    margin: 0;
    font-size: 0.9rem;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
    @media (min-width: 980px) {
      font-size: 1.1rem;
    }
  }
  
  pre, code {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.6rem;
    line-height: 1.4;
    @media (min-width: 768px) {
      font-size: 1.7rem;
    }
    @media (min-width: 980px) {
      font-size: 1.8rem;
    }
  }
  
  blockquote {
    border-left: #9DA1A4 solid 0.5rem;
    display: block;
    margin: 1.6rem 0;
    padding: 1rem 2rem 0.1rem 2rem;
    padding-inline: 0.8rem;
    font-style: italic;
  }
  
  // paragraph spacing
  
  p + h1, p + h2, p + h3, 
  li + h1, li + h2, li + h3, 
  ol + h1, ol + h2, ol + h3, 
  ul + h1, ul + h2, ul + h3, 
  pre + h1, pre + h2, pre + h3,
  div + h1, div + h2, div + h3{
    margin-top: 4rem;
  }
  
  // img resets:
  img {
    background-color: transparent;
  }
  
  p > img {
    max-width: 100%;
  }
  
`;

export const darkTheme = {
  background: '#101921',
  backgroundHighlight: '#262D33',
  nonFocus: '#585F65',
  main: '#81878B',
  mainBright: '#9DA1A4',
  highlight: '#DADDDF',
  // basic highlight colours
  brightRed: '#FF0014',
  brightOrange: '#FF6E00',
  brightYellow: '#F3A900',
  brightGreen: '#009B00',
  brightCyan: '#009C94',
  brightBlue: '#008EFF',
  brightPurple: '#BF2BFF',
  brightMagenta: '#F5006C',
};

export const Layout: React.FC = ({ children }) => (
  <>
    <GlobalStyles theme={darkTheme} />
    <ThemeProvider theme={darkTheme}>
      <NavigationBar />
      {children}
      <Footer />
    </ThemeProvider>
  </>
);
