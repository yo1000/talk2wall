import React from "react"
import { css } from "@emotion/core"

import SiteHeader from "./siteHeader"
import SiteBody from "./siteBody"
import colors from "./colors"

const styles = {
  layout: css`
    margin-left: auto;
    margin-right: auto;

    background: ${colors.black.color};

    >* {
      color: ${colors.white.color};
      text-shadow: ${colors.white.textShadow} 1px 1px;
    }

    * {
      font-family: 'M PLUS 1p';
      word-break: break-all;
    }

    h1, h2, h3, h4, h5, h6, b, strong {
      color: ${colors.white.color};
      text-shadow: ${colors.white.textShadow} 1px 1px;
    }

    h2, h2 {
      text-shadow: ${colors.white.textShadow} 2px 2px;
    }

    p, ul, blockquote {
      a,
      a:active,
      a:visited {
        box-shadow: none;
        color: ${colors.blue.color};
        text-shadow: ${colors.blue.textShadow} 1px 1px;
      }
    }
  `,
}

const Layout = ({ location, title, children }) => (
  <div css={styles.layout}>
    <SiteHeader location={location} title={title}/>
    <SiteBody location={location}>{children}</SiteBody>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </div>
)

export default Layout
