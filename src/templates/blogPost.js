import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"

import theme from "../styles/theme"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Notice from "../components/notice"
import StaticImage from "../components/staticImage"

const styles = {
  postHeader: css`
    ${theme.styles.cardOpacity}

    margin: 0;
    padding: 0 1.25rem 1rem;

    .notice {
      top: -10px;
      left: -16px;
    }

    h1 {
      margin: 0;
    }

    p {
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
  `,
  postBody: css`
    ${theme.styles.cardOpacity}

    margin-bottom: 1rem;
    padding: 1.75rem 1.5rem;

    hr {
      height: 0px;
      margin: 0px -28px;
    }

    h1, h2 {
      &:not(:first-of-type)::before {
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

    ol, ul {
      margin-left: 1.75rem;
    }

    blockquote {
      margin: 0 0 1.75rem;
      padding-left: 1rem;

      font-style: inherit;
      color: ${theme.colors.darkBlue.color};
      text-shadow: ${theme.colors.darkBlue.textShadow} 1px 1px;
      border-left-color: ${theme.colors.darkBlue.color};
    }

    td, th {
      border-bottom: 1px solid ${theme.colors.white.color};
    }

    code,
    code *,
    .gatsby-highlight,
    .gatsby-highlight * {
      font-family: monospace;
    }

    code,
    code * {
      word-break: break-all;
    }

    .gatsby-highlight {
      pre[class*="language-"] {
        position: relative;
        border-radius: 4px;

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
  `,
}

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const pickupTags = data.site.siteMetadata.pickupTags
  const { previous, next } = pageContext

  return (
    <Layout title={siteTitle} social={social} pickupTags={pickupTags} pageContext={pageContext}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header css={styles.postHeader}>
          <Notice>STATUS</Notice>
          <h1>{post.frontmatter.title}</h1>
          <div>
            <p><small>{post.frontmatter.date}</small></p>
            {post.frontmatter.tags && post.frontmatter.tags.length &&
              <ul>
              {post.frontmatter.tags.map((tag) => (
                <li><Link to={`/tag/${tag}`}>#{tag}</Link></li>
              ))}
              </ul>
            }
          </div>
        </header>
        <section css={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.html }}/>
      </article>
      <nav css={theme.styles.pageNav}>
        <ul>
          {next && (
            <li className="next">
              <StaticImage relativePath='arrow-left.png'/>
              <Link to={next.frontmatter.path
                ? next.frontmatter.path
                : next.fields.slug} rel="next" className="next">
                {next.frontmatter.title}
              </Link>
            </li>
          )}
          {previous && (
            <li className="prev">
              <Link to={previous.frontmatter.path
                ? previous.frontmatter.path
                : previous.fields.slug} rel="prev" className="prev">
                {previous.frontmatter.title}
              </Link>
              <StaticImage relativePath='arrow-right.png'/>
            </li>
          )}
        </ul>
      </nav>
      <Bio />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        social {
          twitter
          github
        }
        pickupTags
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        tags
      }
    }
  }
`
