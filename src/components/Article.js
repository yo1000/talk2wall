import {Link} from "gatsby";
import React from "react";
import {css} from "@emotion/react";
import Panel from "./Panel";
import {StaticImage} from "gatsby-plugin-image";

export default function Article({post, nextPath, nextTitle, prevPath, prevTitle}) {
    const style = css`
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

          color: var(--article-anchor-color);
          text-shadow: var(--article-anchor-text-shadow-color) 1px 1px;
        }

        p, ul,
        blockquote,
        footer {
          a,
          a:active,
          a:visited {
            color: var(--article-anchor-color);
            text-shadow: var(--article-anchor-text-shadow-color) 1px 1px;
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
          margin: 0;
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

            border-radius: 3px;
            border-style: solid;
            border-width: 4px 2px 2px 2px;
            border-color: var(--article-separator-border-color);
          }
        }

        > *:first-child {
          margin: 0 !important;
        }

        hr {
          display: block;
          height: 0;
          margin: 1.25rem -26px;

          border-radius: 3px;
          border-style: solid;
          border-width: 4px 2px 2px 2px;
          border-color: var(--article-separator-border-color);
        }

        h1,
        h2 {
          margin-top: 0;
        }

        b, strong {
          color: var(--article-bold-color);
          text-shadow: var(--article-bold-text-shadow-color) 1px 1px;
          font-weight: 400;
          font-style: normal;
        }

        em {
          color: var(--article-italic-color);
          text-shadow: var(--article-italic-text-shadow-color) 1px 1px;
          font-weight: 400;
          font-style: normal;
        }

        ol, ul {
          margin-left: 1.75rem;
          padding: 0;
        }

        blockquote {
          margin: 0 0 1.75rem;
          padding-left: 1rem;

          border-left: 2px solid var(--article-blockquote-border-color);
          border-radius: 1px;

          * {
            font-size: inherit;
            font-style: italic;
            color: var(--article-blockquote-color);
            text-shadow: var(--article-blockquote-text-shadow-color) 1px 1px;
          }
        }

        a,
        a:active,
        a:hover,
        a:visited {
          text-decoration: none;
          color: var(--article-anchor-color);
          text-shadow: var(--article-anchor-text-shadow-color) 1px 1px;
        }

        td, th {
          border-bottom: 1px solid var(--article-table-border-color);
        }

        .gatsby-resp-image-image {
          box-shadow: none !important;
        }

        code,
        code *,
        .gatsby-highlight,
        .gatsby-highlight * {
          font-family: var(--article-code-font-family);
          font-size: 1em;
        }

        code,
        code * {
          word-break: break-all;
        }

        *:not(pre) > code,
        *:not(pre) > code[class*=language-] {
          color: var(--article-code-color);
          text-shadow: var(--article-code-text-shadow-color) 1px 1px;
          background: var(--article-code-background);

          padding: 0 4px;
          border-radius: 4px;
          white-space: normal;

          margin: 0 2px;
        }

        .gatsby-highlight {
          pre[class*="language-"] {
            position: relative;
            border-radius: 4px;
            margin-bottom: 1.75rem;

            &.line-numbers {
              padding-left: 5em;
            }
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
      }

      & > nav {
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          list-style: none;
          margin: 24px 0;
          padding: 0;

          @media screen and (max-width: 640px) {
            margin: 0;
          }

          li {
            width: 100%;
            margin: 3px 0 0;
            padding: 0;

            .panel > div {
              height: calc(2.75rem - 8px);
              margin: auto;

              a {
                line-height: calc(2.75rem - 8px);
              }
            }

            a,
            a:active,
            a:hover,
            a:visited {
              box-shadow: none;
              text-decoration: none;

              width: 100%;
              margin: auto 0;
              padding: .5rem 1.5rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .gatsby-image-wrapper {
              position: absolute;
              width: 7px;
              height: 11px;
              margin: auto 0;
            }

            &.next,
            &.prev {
              .gatsby-image-wrapper {
                top: 15px;
                left: 10px;
              }
            }
          }
        }
      }
    `

    return (
        <div css={style} className={`article`}>
        <Panel label={`STATUS`}>
            <header className={`header`}>
                <h1>{post.frontmatter.title}</h1>
                <div>
                    <small>Created: {post.frontmatter.created}</small>
                    {post.frontmatter.modified ? (
                        <small>Modified: {post.frontmatter.modified}</small>
                    ) : <></>}
                    {post.frontmatter.tags && post.frontmatter.tags.length &&
                        <ul>
                            {post.frontmatter.tags.map((tag) => (
                                <li><Link to={`/tag/${tag}`}>#{tag}</Link></li>
                            ))}
                        </ul>
                    }
                </div>
            </header>
            <section className={`body`} dangerouslySetInnerHTML={{__html: post.html}}/>
        </Panel>
            <nav>
                <ul>
                    {(nextPath && nextTitle) && (
                        <li className="next">
                            <Panel>
                                <div>
                                    <StaticImage alt="arrow-left"
                                                 src="../images/arrow-left.png"
                                                 quality={50}/>
                                    <Link to={nextPath} rel="next" className="next">{nextTitle}</Link>
                                </div>
                            </Panel>
                        </li>
                    )}
                    {(prevPath && prevTitle) && (
                        <li className="prev">
                            <Panel>
                                <Link to={prevPath} rel="prev" className="prev">{prevTitle}</Link>
                                <StaticImage alt="arrow-right"
                                             src="../images/arrow-right.png"
                                             quality={50}/>
                            </Panel>
                        </li>
                    )}
                </ul>
            </nav>
            </div>
    )
}
