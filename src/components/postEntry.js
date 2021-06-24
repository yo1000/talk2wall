import Notice from "./notice";
import {Link} from "gatsby";
import React from "react";
import theme from "../styles/theme";
import {css} from "@emotion/react";

const PostEntry = ({post}) => {
    const headerStyle = css`
        ${theme.styles.cardOpacity}

        position: relative;
        margin: 72px 0 0;
        padding: 1.25rem 1.25rem 1.75rem;

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
    `

    const bodyStyle = css`
        ${theme.styles.cardOpacity}

        margin-bottom: 1rem;
        padding: 1.5rem;
        
        >*:first-child {
            margin: 0 !important;
        }

        hr {
            height: 0px;
            margin: 0px -26px 1.5rem -27px;
            border-radius: 0;
        }

        h1,
        h2 {
            margin-top: 0;
        }

        h1:not(:first-child),
        h2:not(:first-child) {
            ::before {
                content: '';
                display: block;
                height: 0px;
                margin: 1.25rem -28px;

                background-color: ${theme.colors.black.color};
                border-width: 4px;
                border-radius: 3px;
                border-style: ridge groove groove ridge;
                border-color: #313131 ${theme.colors.black.color} #747474 ${theme.colors.black.color};
            }
        }

        b, strong {
            color: ${theme.colors.red.color};
            text-shadow: ${theme.colors.red.textShadow} 1px 1px;
            font-weight: 400;
            font-style: normal;
        }

        em {
            color: ${theme.colors.yellow.color};
            text-shadow: ${theme.colors.yellow.textShadow} 1px 1px;
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

            border-left: 2px solid ${theme.colors.darkBlue.color};
            border-radius: 1px;
            
            * {
                font-size: inherit;
                font-style: italic;
                color: ${theme.colors.darkBlue.color};
                text-shadow: ${theme.colors.darkBlue.textShadow} 1px 1px;
            }
        }
        
        a,
        a:active,
        a:hover,
        a:visited {
            text-decoration: none;
            color: ${theme.colors.blue.color};
            text-shadow: ${theme.colors.blue.textShadow} 1px 1px;
        }

        td, th {
            border-bottom: 1px solid ${theme.colors.white.color};
        }

        .gatsby-resp-image-image {
            box-shadow: none !important;
        }

        code,
        code *,
        .gatsby-highlight,
        .gatsby-highlight * {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1em;
        }

        code,
        code * {
            word-break: break-all;
        }

        *:not(pre) > code,
        *:not(pre) > code[class*=language-] {
            color: #ccc;
            text-shadow: ${theme.colors.white.textShadow} 1px 1px;
            background: #2d2d2d;

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
    `

    return (
        <article>
            <header css={headerStyle}>
                <Notice>STATUS</Notice>
                <h1>{post.frontmatter.title}</h1>
                <div>
                    <small>{post.frontmatter.date}</small>
                    {post.frontmatter.tags && post.frontmatter.tags.length &&
                    <ul>
                        {post.frontmatter.tags.map((tag) => (
                            <li><Link to={`/tag/${tag}`}>#{tag}</Link></li>
                        ))}
                    </ul>
                    }
                </div>
            </header>
            <section
                css={bodyStyle}
                dangerouslySetInnerHTML={{__html: post.html}}
            />
        </article>
    )
}

export default PostEntry
