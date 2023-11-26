import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {css} from "@emotion/react";
import CoverError from "../components/CoverError";
import Seo from "../components/Seo";

export default function NotFoundPage() {
    const headerLines = 2;

    const style = css`
      position: relative;
      top: ${44 * headerLines - 2 * (headerLines - 1)}px;
    `

    return (
      <main css={style}>
          <Seo title={`404 Not found`}/>
          <Header/>
          <CoverError status={`Not Found`}/>
          <Footer/>
      </main>
  )
}
