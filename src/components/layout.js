import React from "react"
import { css } from "@emotion/react"

import theme from "../styles/theme"
import SiteHeader from "./siteHeader"
import SiteBody from "./siteBody"
import SiteFooter from "./siteFooter"

const styles = {
  layout: css`
    margin-left: auto;
    margin-right: auto;

    background: ${theme.colors.black.color};

    >* {
      color: ${theme.colors.white.color};
      text-shadow: ${theme.colors.white.textShadow} 1px 1px;
    }

    * {
      font-family: 'M PLUS 1p';
      word-break: break-all;
    }

    h1, h2, h3, h4, h5, h6 {
      color: ${theme.colors.white.color};
      text-shadow: ${theme.colors.white.textShadow} 1px 1px;
    }

    h2, h2 {
      text-shadow: ${theme.colors.white.textShadow} 2px 2px;
    }

    p, ul,
    blockquote,
    footer {
      a,
      a:active,
      a:visited {
        box-shadow: none;
        color: ${theme.colors.blue.color};
        text-shadow: ${theme.colors.blue.textShadow} 1px 1px;
      }
    }
  `,
}

const Layout = ({ pageContext, children }) => (
  <div css={styles.layout}>
    <SiteHeader pageContext={pageContext}/>
    <SiteBody pageContext={pageContext}>{children}</SiteBody>
    <SiteFooter/>
  </div>
)

export default Layout
