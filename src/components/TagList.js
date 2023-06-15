import * as React from "react";
import {graphql, Link} from "gatsby";
import {css} from "@emotion/react";
import theme from "../styles/theme";
import Panel from "./Panel";

export default function TagList({tags}) {
    const style = css`
      position: relative;
      max-width: 760px;
      margin: 0 auto;
      padding: 0 48px;

      @media screen and (max-width: 640px) {
        padding: 0;

        section {
          padding-left: 0;
          padding-right: 0;
        }
      }

      .header {
        position: relative;
        margin: 0;
        padding: 1.25rem 1.25rem 0;

        .notice {
          position: absolute;
          top: -10px;
          left: 4px;
        }

        a {
          box-shadow: none;
          text-decoration: none;
          text-shadow: ${theme.colors.blue.textShadow} 1px 1px;
        }

        p, ul,
        blockquote,
        footer {
          a,
          a:active,
          a:visited {
            color: ${theme.colors.blue.color};
          }
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;

          li {
            display: inline-block;
            margin-right: .5rem;
            margin-bottom: 0;
          }
        }

        h1 {
          margin: 0;
        }

        small {
          display: block;
          margin: .5rem 0 0;
        }

        ul {
          margin: 0;
          list-style: none;

          li {
            display: inline-block;
            margin-right: .5rem;
            margin-bottom: 0;
          }
        }
      }

      .body {
        margin-bottom: 1rem;
        padding: 0 1.5rem 1.5rem;

        &,
        h1:not(:first-child),
        h2:not(:first-child) {
          ::before {
            content: '';
            display: block;
            height: 0px;
            margin: 1.25rem -26px;

            background-color: ${theme.colors.black.color};
            border-radius: 3px;
            border-top: 4px solid #393939;
            border-left: 2px solid #393939;
            border-right: 2px solid #393939;
            border-bottom: 2px solid #838383;

          }
        }

        > *:first-child {
          margin: 0 !important;
        }

        ul {
          padding: 0;

          li:first-child {
            margin-top: 0;
          }
        }

        a,
        a:active,
        a:hover,
        a:visited {
          text-decoration: none;
        }
      }
    `

    const maxTagCount = tags && tags.length > 0
        ? tags[0].count
        : 0

    const calcColor = (s) => {
        let rgb = {
            r: 255,
            g: 255,
            b: 255,
        }
        for (let i = 0; i < s.length; i++) {
            const hue = i % 3
            if (hue === 0) {
                rgb.r ^= s.charCodeAt(i)
            } else if (hue === 1) {
                rgb.g ^= s.charCodeAt(i)
            } else {
                rgb.b ^= s.charCodeAt(i)
            }
        }
        rgb.r %= 256
        rgb.g %= 256
        rgb.b %= 256
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    }

    return (
        <Panel css={style} className={`tagList`} label={`STATUS`}>
            <header className={`header`}>
                <h1>All tags</h1>
            </header>
            <section className={`body`}>
                <ul css={{
                    marginTop: `calc(1.5rem - 40px)`,
                    marginLeft: 0,
                }}>
                    {tags
                        .map(({name, count}) => ({
                            name: name,
                            count: count,
                            size: 10 + (maxTagCount ? count / maxTagCount * 30 : 0)
                        }))
                        .map(({name, count, size}) => (
                            <li css={{
                                fontSize: `${size}px`,
                                lineHeight: `${size}px`,
                                display: `inline-block`,
                                marginRight: `${size * 0.5}px`,
                                marginTop: `${size * 0.5}px`,
                            }}>
                                <Link to={`/tag/${name}`} rel={`/tag/${name}`} css={{
                                    color: `${calcColor(name)} !important`,
                                }}>{name} ({count})</Link>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </Panel>
    )
}

export const pageQuery = graphql`
    query {
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
                filteredTags
            }
        }
    }
`
