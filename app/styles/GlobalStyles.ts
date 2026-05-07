import { createGlobalStyle } from "styled-components";
import { T } from "./tokens";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${T.fontBody};
    background: ${T.bg};
    color: ${T.ink};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: ${T.accent};
    color: #fff;
  }

  ::-webkit-scrollbar { width: 2px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.accent}; border-radius: 2px; }

  a { color: inherit; text-decoration: none; }
  button { font-family: ${T.fontBody}; }
  img { display: block; max-width: 100%; }
`;
