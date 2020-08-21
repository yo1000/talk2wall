import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import theme from "../styles/theme"
import StaticImage from "./staticImage"
import Notice from "./notice"
import Search from "./search"

const styles = {
  navigation: css`
    display: flex;
    position: fixed;
    left: 0;
    width: 100%;
    height: 48px;

    background-color: ${theme.colors.black.color};
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
  navigationItem: css`
    ${theme.styles.cardOpacity}

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
    color: ${theme.colors.white.color};
    text-shadow: ${theme.colors.white.textShadow} 1px 1px;

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
  coverImageContainer: css`
    max-width: 800px;
    margin: 0 auto;

    > div:first-of-type {
      position: relative;
      width: 100%;
    }

    @media screen and (max-width: 832px) {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  `,
  coverImageOverray: css`
    display: block;
    position: absolute;
    width: 100%;
    height: 140px;
    bottom: 0;
    background: linear-gradient(180deg, transparent, ${theme.colors.black.color});
  `,
  coverImageLogo: css`
    position: relative;
    width: 240px;
    bottom: 50px;
    margin: -30% auto 30%;

    @media screen and (max-width: 832px) {
      position: relative !important;
    }
  `,
  coverTag: css`
    position: relative;
    width: 100%;
    height: 64px;
    bottom: 64px;
    text-align: center;
    margin: -27% auto 27%;

    color: ${theme.colors.white.color};
    text-shadow: ${theme.colors.white.textShadow} 1px 1px;
  `,
  coverError: css`
    position: relative;
    width: 100%;
    height: 64px;
    bottom: 64px;
    text-align: center;
    margin: -27% auto 27%;

    color: ${theme.colors.white.color};
    text-shadow: ${theme.colors.white.textShadow} 1px 1px;

    font-family: 'Niconne' !important;
    font-size: 64px;
    font-weight: 800;
  `,
  headerSpacer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
  `,
}

const Title = ({ children }) => (
  <h1 css={styles.title}>
    <Link to={`/`}>{children}</Link>
  </h1>
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
  </nav>
)

const RootImage = () => (
  <div css={styles.coverImageContainer}>
    <div>
      <StaticImage relativePath='header/cover-root.png'/>
      <div css={styles.coverImageOverray}></div>
    </div>
    <StaticImage
      relativePath="header/logo.png"
      css={styles.coverImageLogo}
    />
  </div>
)

const TagImage = ({ tag }) => (
  <div css={styles.coverImageContainer}>
    <div>
      <StaticImage relativePath='header/cover-tag.png'/>
      <div css={styles.coverImageOverray}></div>
    </div>
    <h2 css={styles.coverTag}>
      {`（…………${tag}）`}
    </h2>
  </div>
)

const ErrorImage = ({ code }) => (
  <div css={styles.coverImageContainer}>
    <div>
      <StaticImage relativePath='header/cover-error.png'/>
      <div css={styles.coverImageOverray}></div>
    </div>
    <h2 css={styles.coverError}>
      {code}
    </h2>
  </div>
)

const Cover = ({ templateName, pageContext }) => (
  <>
    {templateName === 'blogPostsAll' && <RootImage/>}
    {templateName === 'blogPostsTag' && <TagImage tag={pageContext.tag}/>}
    {templateName === '404' && <ErrorImage code='404'/>}
  </>
)

const SiteHeader = ({ title, templateName, pageContext }) => (
  <header>
    <Navigation title={title}/>
    <div>
      <div css={styles.headerSpacer}></div>
      <Cover templateName={templateName} pageContext={pageContext}/>
    </div>
  </header>
)

export default SiteHeader
