import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Notice from "../components/notice"
import colors from "../components/colors"
import globalStyles from "../components/styles"

const styles = {
  postHeader: css`
    ${globalStyles.cardOpacity}

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
    ${globalStyles.cardOpacity}

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

        background-color: ${colors.black.color};
        border-width: 4px;
        border-radius: 3px;
        border-style: ridge groove groove ridge;
        border-color: #313131 ${colors.black.color} #747474 ${colors.black.color};
      }
    }

    ol, ul {
      margin-left: 1.75rem;
    }
  `,
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
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
        <section
          css={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.html }}/>
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.frontmatter.path
                ? previous.frontmatter.path
                : previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.frontmatter.path
                ? next.frontmatter.path
                : next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
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
