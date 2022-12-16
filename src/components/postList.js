import {Link} from "gatsby";
import * as React from "react";
import {css} from "@emotion/react";
import theme from "../styles/theme";

const PostList = ({postNodes}) => {
    const styles = {
        article: css`
            ${theme.styles.cardSemiTransparency};

            width: 44rem;
            min-width: 44rem;

            padding: 1.75rem 1.5rem;
            margin: 0 auto 24px;

            @media screen and (max-width: 640px) {
                margin: 0;
            }

            h1, h2, h3, h4, h5, h6 {
                color: ${theme.colors.white.color};
                text-shadow: ${theme.colors.white.textShadow} 1px 1px;
            }

            h2, h2 {
                text-shadow: ${theme.colors.white.textShadow} 2px 2px;
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
        `,
        header: css`
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
        `,
        title: css`
            margin-top: 0;
            margin-bottom: .4375rem;
        `,
        titleLink: css`
            box-shadow: none;
            color: ${theme.colors.white.color};
            text-shadow: ${theme.colors.white.textShadow} 2px 2px;
        `,
        excerpt: css`
            margin-bottom: 0;
        `,
    }

    return (postNodes.map(node => {
        const title = node.frontmatter.title || node.fields.slug

        return (
            <article css={styles.article}>
                <header css={styles.header}>
                    <h2 css={styles.title}>
                        <Link css={styles.titleLink} to={node.frontmatter.path
                            ? node.frontmatter.path
                            : node.fields.slug}>
                            {title}
                        </Link>
                    </h2>
                    <small>{node.frontmatter.date}</small>
                    {node.frontmatter.tags && node.frontmatter.tags.length &&
                    <ul>
                        {node.frontmatter.tags.map((tag) => (
                            <li><Link to={`/tag/${tag}`}>#{tag}</Link></li>
                        ))}
                    </ul>
                    }
                </header>
                <section>
                    <p css={styles.excerpt}
                       dangerouslySetInnerHTML={{
                           __html: node.excerpt,
                       }}
                    />
                </section>
            </article>
        )
    }))
}

export default PostList
