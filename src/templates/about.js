import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"

import theme from "../styles/theme"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Notice from "../components/notice"

const styles = new class Styles {
  constructor() {
    this.postMeta = css`
      margin-bottom: 1.75rem;
    `
    this.postHeader = css`
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
    this.postBody = css`
      ${theme.styles.cardOpacity}
    
      margin-bottom: 1rem;
      padding: 1.5rem;
    
      h1,
      h2 {
        &:first-child::before {
          margin: 0 !important;
          border-style: none !important;
          border-width: 0 !important;
          }
      }

      hr {
        height: 0px;
        margin: 0px -28px 1.5rem;
      }

      h1,
      h2 {
        margin-top: 0;

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
    
      ol, ul {
        margin-left: 1.75rem;
      }
    
      blockquote {
        margin: 0 0 1.75rem;
        padding-left: 1rem;
    
        font-size: inherit;
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
        font-family: 'Ubuntu Mono', monospace;
      }
    
      code,
      code * {
        word-break: break-all;
      }
    
      *:not(pre) > code,
      *:not(pre) > code[class*=language-] {
        color: ${theme.colors.yellow.color};
        text-shadow: ${theme.colors.yellow.textShadow} 1px 1px;
        background: transparent;
        padding: .1em;
        border-radius: .3em;
        white-space: normal;
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
    `
  }
}()

const AboutTemplate = ({ pageContext, data }) => {
  const post = data.markdownRemark
  
  return (
    <Layout pageContext={pageContext}>
      <SEO title={post.frontmatter.title}/>
      <article>
        <header css={styles.postHeader}>
          <Notice>STATUS</Notice>
          <h1>{post.frontmatter.title}</h1>
          <div css={styles.postMeta}>
            <p><small>{post.frontmatter.date}</small></p>
          </div>
        </header>
        <section css={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.html }}/>
      </article>
      <Bio />
    </Layout>
  )
}

export default AboutTemplate

export const pageQuery = graphql`
  query AboutSlug($slug: String!) {
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