import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    scroll-behavior: smooth;
    font-size: 62.5%;
  }
  html, body {
    height: 100%;
    color: #DADDDF;
    background-color: ${({ theme }) => theme.background};
    margin: 0;
    padding: 0;
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
    <GlobalStyle theme={darkTheme} />
    <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
  </>
);
