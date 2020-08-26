import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import { templates } from "../utils/templates"
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

    a {
      color: ${theme.colors.white.color};
      text-shadow: ${theme.colors.white.textShadow};
      box-shadow: none;
    }

    &.menu-container {
      width: calc(100% - 320px);
      padding-right: 6px;
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
  menu: css`
    position: relative;
    margin: -34px 4px;
    overflow: hidden;
    white-space: nowrap;

    @media screen and (max-width: 479px) {
      top: 3px;
    }

    span {
      display: inline-block;
      position: relative;
      top: -12px;
      margin-left: 8px;

      @media screen and (max-width: 519px) {
        display: none;
      }
    }
  `,
  menuIcon: css`
    display: inline-block;
    width: 18px;
    margin: 8px 9px;
    filter: drop-shadow(1px 1px 1px ${theme.colors.white.textShadow});
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
  coverLogoTitle: css`
    position: relative;
    width: 240px;
    bottom: 50px;
    margin: -30% auto 30%;

    @media screen and (max-width: 832px) {
      position: relative !important;
    }
  `,
  coverTagTitle: css`
    position: relative;
    width: 100%;
    height: 64px;
    bottom: 64px;
    text-align: center;
    margin: -27% auto 27%;

    color: ${theme.colors.white.color};
    text-shadow: ${theme.colors.white.textShadow} 1px 1px;

    @media screen and (max-width: 479px) {
      bottom: 48px;
    }
  `,
  coverAboutTitle: css`
    position: relative;
    width: 280px;
    bottom: 50px;
    margin: -32.5% auto 32.5%;

    @media screen and (max-width: 832px) {
      position: relative !important;
    }
  `,
  coverErrorTitle: css`
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

const NavigationItem = ({ className, htmlFor, notice, children }) => (
  <div css={styles.navigationItem} className={className}>
    <Notice htmlFor={htmlFor}>{notice}</Notice>
    {children}
  </div>
)

const Navigation = ({ title, social, tags }) => (
  <nav css={styles.navigation}>
    <div className="overray"></div>
    <NavigationItem className="menu-container" notice="notice">
      <div css={styles.menu}>
        <Link to={`/`}>
          <StaticImage relativePath='header/icon-home.png' css={styles.menuIcon}/>
        </Link>
        <a href={`https://github.com/${social.github}`}
          target="_blank" rel="noopener noreferrer">
          <StaticImage relativePath='header/icon-github.png' css={styles.menuIcon}/>
        </a>
        <a href={`https://twitter.com/${social.twitter}`}
          target="_blank" rel="noopener noreferrer">
          <StaticImage relativePath='header/icon-twitter.png' css={styles.menuIcon}/>
        </a>
        <Link to={`/rss.xml`}>
          <StaticImage relativePath='header/icon-rss.png' css={styles.menuIcon}/>
        </Link>
        {/* TODO: <span>About</span> */}
        {tags.map((tag) => (
          <span>
            <Link to={`/tag/${tag.name}`}>{tag.name}{`(${tag.count})`}</Link>
          </span>
        ))}
      </div>
    </NavigationItem>
    <NavigationItem htmlFor="search" className="search-container" notice="name">
      <Search id="search"/>
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
      css={styles.coverLogoTitle}
    />
  </div>
)

const calcCoverTagIndex = (tag) => {
  let index = 0
  for (let i = 0; i < tag.length; i++) {
    index ^= tag.charCodeAt(i)
  }
  return index % 14
}

const TagImage = ({ tag }) => (
  <div css={styles.coverImageContainer}>
    <div>
      <StaticImage relativePath={`header/cover-tag/${calcCoverTagIndex(tag)}.png`}/>
      <div css={styles.coverImageOverray}></div>
    </div>
    <h2 css={styles.coverTagTitle}>
      {tag}
    </h2>
  </div>
)

const AboutImage = () => (
  <div css={styles.coverImageContainer}>
    <div>
      <StaticImage relativePath='header/cover-about.png'/>
      <div css={styles.coverImageOverray}></div>
    </div>
    <StaticImage
      relativePath="header/cover-about-message.png"
      css={styles.coverAboutTitle}
    />
  </div>
)

const ErrorImage = ({ code }) => (
  <div css={styles.coverImageContainer}>
    <div>
      <StaticImage relativePath='header/cover-error.png'/>
      <div css={styles.coverImageOverray}></div>
    </div>
    <h2 css={styles.coverErrorTitle}>
      {code}
    </h2>
  </div>
)

const Cover = ({ templateName, pageContext }) => (
  <>
    {templateName === templates.blogPostsAll.name && <RootImage/>}
    {templateName === templates.blogPostsTag.name && <TagImage tag={pageContext.tag}/>}
    {templateName === templates.about.name && <AboutImage pageContext={pageContext}/>}
    {templateName === templates._404.name && <ErrorImage code='404'/>}
  </>
)

const SiteHeader = ({ pageContext }) => (
  <header>
    <Navigation
      title={pageContext.siteMetadata.title}
      social={pageContext.siteMetadata.social}
      tags={pageContext.menuTags}
    />
    <div>
      <div css={styles.headerSpacer}></div>
      <Cover
        templateName={pageContext.templateName}
        pageContext={pageContext}
      />
    </div>
  </header>
)

export default SiteHeader
