/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { css } from "@emotion/react"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          fixed(width: 38, height: 68) {
            ...GatsbyImageSharpFixed
          }
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
    }
  `)

  const styles = {
    avatarContainer: css`
      display: flex;
      margin-top: 1.5rem;
      margin-bottom: 0;
      padding: 0 4px;

      * {
        word-break: break-word;
      }

      .avatar {
        width: 38px;
        height: 68px;
        min-width: 38px;

        margin-right: ${rhythm(1 / 2)};
        margin-bottom: 0;
    }
    `
  }

  const { author, social } = data.site.siteMetadata
  return (
    <div css={styles.avatarContainer}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        className="avatar"
      />
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
