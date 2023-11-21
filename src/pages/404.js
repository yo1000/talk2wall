import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {css} from "@emotion/react";
import theme from "../styles/theme";
import CoverError from "../components/CoverError";

export default function NotFoundPage() {
    const headerLines = 2;

    const style = css`
      position: relative;
      top: ${44 * headerLines - 2 * (headerLines - 1)}px;

      * {
        word-break: break-all;
        color: ${theme.colors.white.color};
        text-shadow: ${theme.colors.white.textShadow} 1px 1px;
      }
    `

    return (
      <main css={style}>
          <Header/>
          <CoverError status={`Not Found`}/>
          <Footer/>
      </main>
  )
}
