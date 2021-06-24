/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";
import {css} from "@emotion/react"

import "@fontsource/m-plus-1p"
import "@fontsource/kanit"
import "@fontsource/niconne"
import "@fontsource/jetbrains-mono"
import theme from "../styles/theme";

const Bio = () => {
    const styles = {
        avatarContainer: css`
            display: flex;
            margin: 0 .875rem;
            padding: 0 4px;

            font-family: 'M PLUS 1p';
            color: ${theme.colors.white.color};
            text-align: left;

            * {
                word-break: break-word;
            }

            & > p {
                margin: 0 0 1.5rem;
            }

            a,
            a:hover,
            a:active,
            a:visited {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                box-shadow: none;
                text-decoration: none;
                color: ${theme.colors.blue.color};
            }

            .avatar {
                width: 38px;
                height: 68px;
                min-width: 38px;
                margin: 0 .875rem .875rem 0;
            }

            @media screen and (max-width: 479px) {
                margin-right: 0;

                & > p {
                    margin-top: -.25rem;
                }
            }
        `
    }

    const data = useStaticQuery(graphql`query BioQuery {
        avatar: file(absolutePath: {regex: "/avatar.png/"}) {
            childImageSharp {
                gatsbyImageData(width: 38, height: 68, layout: FIXED)
            }
        }
        site {
            siteMetadata {
                author {
                    name
                    summary
                }
                social {
                    twitter
                    github
                }
            }
        }
    }`)

    const {author, social} = data.site.siteMetadata

    return (
        <div css={styles.avatarContainer}>
            <StaticImage
                src="../images/avatar.png"
                alt="avatar" className="avatar"/>
            <p>
                Written by <strong>{author.name}</strong> {author.summary}
                {` `}
                <a href={`https://github.com/${social.github}`}
                   target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                {` `}
                <a href={`https://twitter.com/${social.twitter}`}
                   target="_blank" rel="noopener noreferrer">
                    Twitter
                </a>
            </p>
        </div>
    )
}

export default Bio
