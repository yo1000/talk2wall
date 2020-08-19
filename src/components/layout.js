import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import { rhythm } from "../utils/typography"

import StaticImage from "./staticImage"
import Notice from "./notice"
import Search from "./search"

import colors from "./colors"

import globalStyles from "./styles"

const rootPath = `${__PATH_PREFIX__}/`
const tagPathPrefix = `${__PATH_PREFIX__}/tag/`

const styles = {
  coverImageContainer: css`
    position: relative;
    width: 100%;
  `,
  coverImageOverray: css`
    display: block;
    position: absolute;
    width: 100%;
    height: 140px;
    bottom: 0;
    background: linear-gradient(180deg, transparent, ${colors.black.color});
  `,
  coverImageLogo: css`
    position: relative;
    width: 240px;
    bottom: 64px;
    margin: -30% auto 30%;

    @media screen and (max-width: 832px) {
      position: relative !important;
      width: 30%;
    }
  `,
  mainRoot: css`
    position: relative;
    max-width: 800px;
    margin-top: ${rhythm(-6.5)};
    margin-left: auto;
    margin-right: auto;
    padding: ${rhythm(1.5)};
  `,
  mainTag: css`
    position: relative;
    max-width: 800px;
    margin-top: ${rhythm(-6.5)};
    margin-left: auto;
    margin-right: auto;
    padding: ${rhythm(1.5)};
  `,
  mainPost: css`
    position: relative;
    max-width: 800px;
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    padding: ${rhythm(0.75)} ${rhythm(1.5)};
  `,
  headerContainer: css`
    max-width: 800px;
    margin: 0 auto;

    @media screen and (max-width: 832px) {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  `,
  headerSpacer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
  `,
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

    code,
    code *,
    .gatsby-highlight,
    .gatsby-highlight * {
      font-family: monospace;
    }

    .gatsby-highlight {
      pre[class*="language-"] {
        position: relative;
        border-radius: 4px;

        &.line-numbers {
          padding-left: 5em;
        }
      }

      .gatsby-highlight-code-line {
        display: block;
        width: calc(100% + 6em);
        margin-left: -5em;
        padding-left: 5em;

        background-color: #434343;
      }

      pre,
      .line-numbers-rows {
        max-height: 100%;
        left: -2em;
        margin-left: 2em;
        margin-right: -2em;
        padding-top: 1em;
        padding-bottom: 1em;
      }
    }
  
    h1, h2, h3, h4, h5, h6, b, strong {
      color: ${colors.white.color};
      text-shadow: ${colors.white.textShadow} 1px 1px;
    }

    h2, h2 {
      text-shadow: ${colors.white.textShadow} 2px 2px;
    }

    blockquote {
      margin: 0 0 1.75rem;
      padding-left: 1rem;

      font-style: inherit;
      color: ${colors.darkBlue.color};
      text-shadow: ${colors.darkBlue.textShadow} 1px 1px;
      border-left-color: ${colors.darkBlue.color};
    }

    td, th {
      border-bottom: 1px solid ${colors.white.color};
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
  navigation: css`
    display: flex;
    position: fixed;
    left: 0;
    width: 100%;
    height: 48px;

    background-color: ${colors.black.color};
    box-shadow: 0px 1px rgba(0, 0, 0, .2);
    z-index: 1000;

    .overray {
      position: absolute;
      top: 48px;
      width: 100%;
      height: .5rem;
      background: linear-gradient(
        180deg,
        #000,
        rgba(0, 0, 0, .25) 10%,
        transparent
      );
    }
  `,
  title: css`
    display: inline-block;
    float: right;
    width: 160px;
    height: 48px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    margin: 0px;
    
    background: linear-gradient(
      90deg,
      rgba(68, 68, 68, 1),
      hsla(0, 0%, 45.5%, 1)
    ) 50%;
    color: ${colors.white.color};
    text-shadow: ${colors.white.textShadow} 1px 1px;

    border-color: #747474 #313131 #313131 #747474;
    border-radius: 2px;
    border-width: 4px;
    border-style: groove ridge ridge groove;

    a {
      box-shadow: none;
      color: inherit;
    }

    @media screen and (max-width: 479px) {
      display: none;
    }
  `,
  navigationItem: css`
    ${globalStyles.cardOpacity}

    display: inline-block;
    height: 42px;
    line-height: 34px;
    font-size: 14px;
    margin-top: 6px;

    &.menu-container {
      width: calc(100% - 320px);
    }

    &.search-container {
      width: 160px;
    }

    &.renzokuken {
      width: 160px;
    }

    @media screen and (max-width: 479px) {
      &.menu-container,
      &.search-container {
        width: 50%;
        height: 48px;
        margin-top: 0;

        .underline {
          top: 21px;
        }
        .underline.shadow {
          top: 22px;
        }
        input {
          top: 1px;
        }
      }
    }
  `,
  renzokuken: css`
    display: flex;
    position: relative;
    float: right;
    top: 9px;
    height: 23px;
    margin: 0 2px;
    padding: 0;

    border: solid 1px #909090;
    background-color: #909090;

    .box1 {
      display: inline-block;
      width: 10%;
      height: 100%;
      margin: 0;

      border: solid 1px #909090;
      border-radius: 0 4px 4px 0;
      background-color: #000;
    }

    .box2 {
      display: inline-block;
      width: 15%;
      height: 100%;
      margin: 0;

      border: solid 1px #909090;
      border-radius: 4px;
      background-color: #000;
    }

    input {
      display: inline-block;
      position: relative;
      top: 0;
      width: 75%;
      height: 100%;
      margin: 0;
 
      border: solid 1px #909090;
      border-radius: 4px 0 0 4px;
      background-color: #000;
      /*
      background: linear-gradient(
        to right,
        #000 15%,
        #2a2066 15%,
        #2a2066 20%,
        #4938b3 10%,
        #000
      );
      */
      background: linear-gradient(
        to right,
        #000 10%,
        #6b7400 10%,
        #4c5300 15%,
        #98a500 10%,
        #000
      );
      color: ${colors.white.color};
    }
  `,
  coverTag: css`
    position: relative;
    width: 100%;
    height: 64.7px;
    bottom: 64px;
    text-align: center;
    margin: -27% auto 27%;

    color: rgba(255,255,255,0.86);
    text-shadow: #443 1px 1px;
  `,
}

const Title = ({ children }) => (
  <h1 css={styles.title}>
    <Link to={`/`}>{children}</Link>
  </h1>
)

const Renzokuken = () => (
  <div css={styles.navigationItem} className="renzokuken">
    <div css={styles.renzokuken}>
      <div className="box1"></div>
      <div className="box2"></div>
      <input type="text" placeholder="Trigger!"/>
    </div>
    <Notice>SPECIAL</Notice>
  </div>
)

const NavigationItem = ({ className, notice, children }) => (
  <div css={styles.navigationItem} className={className}>
    <Notice>{notice}</Notice>
    {children}
  </div>
)

const Navigation = ({ title }) => (
  <nav css={styles.navigation}>
    <div className="overray"></div>
    <NavigationItem className="menu-container" notice="notice">
      <div></div>
    </NavigationItem>
    <NavigationItem className="search-container" notice="name">
      <Search/>
    </NavigationItem>
    <Title>{title}</Title>
    <Notice/>
  </nav>
)

const CoverImage = ({ pathType, location }) => (
  <>{
    pathType === 'root' ? <>
      <div css={styles.coverImageContainer}>
        <StaticImage relativePath='header/cover-root.png'/>
        <div css={styles.coverImageOverray}></div>
      </div>
      <StaticImage
        relativePath="header/logo.png"
        css={styles.coverImageLogo}
      />
    </> : pathType === 'tag' ? <>
      <div css={styles.coverImageContainer}>
        <StaticImage relativePath='header/cover-tag.png'/>
        <div css={styles.coverImageOverray}></div>
      </div>
      <h2 css={styles.coverTag}>
        {`（…………${location.pathname.substring(tagPathPrefix.length)}）`}
      </h2>
    </> : <></>
  }</>
)

const Cover = ({ pathType, location }) => (
  <div css={styles.headerContainer}>
    <CoverImage pathType={pathType} location={location}/>
  </div>
)

const Header = ({ pathType, location, title }) => (
  <header>
    <Navigation title={title}/>
    <div css={styles.headerContainer}>
      <div css={styles.headerSpacer}></div>
      { pathType && (<Cover pathType={pathType} location={location}/>) }
    </div>
  </header>
)

const Main = ({ pathType, children }) => (
  <main css={
    pathType === 'root' ? styles.mainRoot :
    pathType === 'tag' ? styles.mainTag :
    styles.mainPost
  }>{children}</main>
)

const Layout = ({ location, title, children }) => {
  const pathType =
    location.pathname === rootPath ? 'root' :
    location.pathname.indexOf(tagPathPrefix) === 0 ? 'tag' :
    null
  
  return (
    <div css={styles.layout}>
      <Header pathType={pathType} location={location} title={title}/>
      <Main pathType={pathType}>{children}</Main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
