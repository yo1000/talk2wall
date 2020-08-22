import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"

import theme from "../styles/theme"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StaticImage from "../components/staticImage"
import { rhythm } from "../utils/typography"

const styles = {
  title: {
    marginTop: 0,
    marginBottom: rhythm(1 / 4),
  },
  titleLink: {
    boxShadow: `none`,
    color: `${theme.colors.white.color}`,
    textShadow: `${theme.colors.white.textShadow} 2px 2px`,
  },
  excerpt: {
    marginBottom: 0,
  },

  article: css`
    ${theme.styles.cardSemiTransparency}

    padding: 1.75rem 1.5rem;
    margin-bottom: 1rem;
  `,
  header: css`
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
}

const BlogPostsAllTemplate = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const pickupTags = data.site.siteMetadata.pickupTags
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle} social={social} pickupTags={pickupTags} pageContext={pageContext}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article css={styles.article} key={node.fields.slug}>
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
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      <nav css={theme.styles.pageNav}>
        <ul>
          {pageContext.nextPath && (
            <li className="next">
              <StaticImage relativePath='arrow-left.png'/>
              <Link to={pageContext.nextPath} rel="next" className="next">
                Newer posts
              </Link>
            </li>
          )}
          {pageContext.previousPath && (
            <li className="prev">
              <Link to={pageContext.previousPath} rel="prev" className="prev">
                Older posts
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

export default BlogPostsAllTemplate

export const pageQuery = graphql`
  query BlogPostsAllQuery($limit: Int, $skip: Int) {
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
    allMarkdownRemark(limit: $limit, skip: $skip, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            path
            tags
            description
          }
        }
      }
    }
  }
`
