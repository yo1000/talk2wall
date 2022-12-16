import theme from "../styles/theme";
import {StaticImage} from "gatsby-plugin-image";
import {Link} from "gatsby";
import * as React from "react";
import {css} from "@emotion/react";

const PostListNav = ({nextPath, prevPath}) => {
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
        arrowLeft: css`
            width: .5rem;
            top: 1rem;
            margin-right: .5rem;
        `,
        arrowRight: css`
            width: .5rem;
            top: 1rem;
            margin-left: .5rem;
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
        spacer: css`
            opacity: 0;

            width: 44rem;
            min-width: 44rem;

            padding: 0 1.5rem;
            margin: 0 auto 0;
        `,
    }

    return (
        <> {nextPath && (
            <article css={styles.article}>
                <header css={styles.header}>
                    <h2 css={styles.title}>
                        <StaticImage css={styles.arrowLeft} src="../images/arrow-left.png"/>
                        <Link css={styles.titleLink} to={nextPath}>
                            Newer posts
                        </Link>
                    </h2>
                    <small></small>
                </header>
                <section>
                    <p css={styles.excerpt}/>
                </section>
            </article>
        )} {prevPath && (
            <article css={styles.article}>
                <header css={styles.header}>
                    <h2 css={styles.title}>
                        <Link css={styles.titleLink} to={prevPath}>
                            Older posts
                        </Link>
                        <StaticImage css={styles.arrowRight} src="../images/arrow-right.png"/>
                    </h2>
                    <small></small>
                </header>
                <section>
                    <p css={styles.excerpt}/>
                </section>
            </article>
        )} {(!nextPath || !prevPath) && (
            <div css={styles.spacer}></div>
        )} </>
)
}

export default PostListNav
