// adds theme types for TS integration with styled-components
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    backgroundHighlight: string;
    nonFocus: string;
    main: string;
    mainBright: string;
    highlight: string;
    brightRed: string;
    brightOrange: string;
    brightYellow: string;
    brightGreen: string;
    brightCyan: string;
    brightBlue: string;
    brightPurple: string;
    brightMagenta: string;
  }
}
