import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"

import "@fontsource/m-plus-1p"
import "@fontsource/kanit"
import "@fontsource/niconne"
import "@fontsource/jetbrains-mono"

import { css } from "@emotion/react"
import theme from "../styles/theme"

import Notice from "../components/notice"
import SearchInput from "./searchInput"
import {StaticImage} from "gatsby-plugin-image";

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

        font-family: 'M PLUS 1p';
        word-break: break-all;
        
        a {
            text-decoration: none;
        }
        
        .overlay {
            position: absolute;
            top: 48px;
            width: 100%;
            height: .5rem;
            background: linear-gradient(180deg,
            #000,
            rgba(0, 0, 0, .25) 10%,
            transparent);
        }
    `,
    navigationItem: css`
        ${theme.styles.cardOpacity};

        display: inline-block;
        position: relative;
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
        position: absolute;
        white-space: nowrap;

        @media screen and (max-width: 479px) {
            top: 3px;
        }

        span {
            display: inline-block;
            position: relative;
            margin-left: 8px;

            @media screen and (max-width: 519px) {
                display: none;
            }
        }
    `,
    menuItem: css`
        position: fixed;
        width: calc(100% - 340px);
        overflow: hidden;

        @media screen and (max-width: 479px) {
            width: unset;
        }
    `,
    menuIcon: css`
        display: inline-block;
        width: 18px;
        margin: 8px 9px;
        filter: drop-shadow(1px 1px 1px ${theme.colors.white.textShadow});
    `,
    menuIconOptional: css`
        display: inline-block;
        width: 18px;
        margin: 8px 9px;
        filter: drop-shadow(1px 1px 1px ${theme.colors.white.textShadow});

        @media screen and (max-width: 519px) {
            display: none;
        }
    `,
    title: css`
        display: inline-block;
        float: right;
        width: 160px;
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
    headerSpacer: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 48px;
    `,
}

const SiteHeader = ({ children }) => {
    const data = useStaticQuery(graphql`query SiteHeaderQuery {
        allMarkdownRemark(
            filter: {fields: {slug: {regex: "^/posts/"}}}
            sort: {fields: [frontmatter___date], order: DESC}
            limit: 1000
        ) {
            nodes {
                frontmatter {
                    title
                    path
                    tags
                }
            }
        }
        site {
            siteMetadata {
                title
                social {
                    twitter
                    github
                }
                filteredTags
            }
        }
    }`)

    const tags = data.allMarkdownRemark.nodes
        .map(node => node.frontmatter.tags)
        .reduce((acc, cur) => ([...acc, ...(
            cur
                ? Array.isArray(cur)
                ? cur
                : [cur]
                : []
        )]), [])
        .reduce((acc, cur) => {
            const found = acc.find(({ name }) => (name === cur))
            if (found) {
                found.count++
                return acc
            } else {
                return [
                    ...acc,
                    { name: cur, count: 1, },
                ]
            }
        }, [])

    const menuTags = tags
        .filter(({ name }) => (!data.site.siteMetadata.filteredTags.includes(name)))
        .sort((a, b) => b.count - a.count)

    return (
        <header>
            <Navigation
                title={data.site.siteMetadata.title}
                social={data.site.siteMetadata.social}
                tags={menuTags}
            />
            <div>
                <div css={styles.headerSpacer}></div>
                {children}
            </div>
        </header>
    )
}

const Navigation = ({ title, social, tags }) => (
    <nav css={styles.navigation}>
        <div className="overlay"></div>
        <NavigationItem className="menu-container" notice="notice">
            <div css={styles.menu}>
                <div css={styles.menuItem}>
                    <Link to={`/`}>
                        <StaticImage src='../images/header/icon-home.png' css={styles.menuIcon}/>
                    </Link>
                    <Link to={`/about`}>
                        <StaticImage src='../images/header/icon-about.png' css={styles.menuIcon}/>
                    </Link>
                    <Link to={`/tags`}>
                        <StaticImage src='../images/header/icon-tags.png' css={styles.menuIcon}/>
                    </Link>
                    <Link to={`/bookmarks`}>
                        <StaticImage src='../images/header/icon-bookmarks.png' css={styles.menuIcon}/>
                    </Link>
                    <Link to={`/rss.xml`}>
                        <StaticImage src='../images/header/icon-rss.png' css={styles.menuIconOptional}/>
                    </Link>
                    <a href={`https://github.com/${social.github}`}
                       target="_blank" rel="noopener noreferrer">
                        <StaticImage src='../images/header/icon-github.png' css={styles.menuIconOptional}/>
                    </a>
                    <a href={`https://twitter.com/${social.twitter}`}
                       target="_blank" rel="noopener noreferrer">
                        <StaticImage src='../images/header/icon-twitter.png' css={styles.menuIconOptional}/>
                    </a>
                    {tags.map((tag) => (
                        <span>
              <Link to={`/tag/${tag.name}`}>{tag.name}{`(${tag.count})`}</Link>
            </span>
                    ))}
                </div>
            </div>
        </NavigationItem>
        <NavigationItem htmlFor="search" className="search-container" notice="name">
            <SearchInput id="search"/>
        </NavigationItem>
        <Title>{title}</Title>
    </nav>
)

const NavigationItem = ({ className, htmlFor, notice, children }) => (
    <div css={styles.navigationItem} className={className}>
        <Notice htmlFor={htmlFor}>{notice}</Notice>
        {children}
    </div>
)

const Title = ({ children }) => (
    <h1 css={styles.title}>
        <Link to={`/`}>{children}</Link>
    </h1>
)

export default SiteHeader
