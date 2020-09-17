import React from "react"
import { css } from "@emotion/core"

import theme from "../styles/theme"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Notice from "../components/notice"
import { Link } from "gatsby"

const styles = new class Styles {
  constructor() {
    this.postMeta = css`
      margin-bottom: 1.75rem;
    `
    this.postHeader = css`
      ${theme.styles.cardOpacity}
    
      position: relative;
      margin: 0;
      padding: 1.25rem 1.25rem 1rem;

      .notice {
        position: absolute;
        top: -10px;
        left: 4px;
      }
    
      h1 {
        margin: 0;
      }
    
      small {
        display: block;
        margin: .5rem 0 0;
      }
    `
    this.postBody = css`
      ${theme.styles.cardOpacity}
    
      margin-bottom: 1rem;
      padding: 1.5rem;
    `
  }
}()

const TagsTemplate = ({ pageContext }) => {
  const maxTagCount = pageContext.menuTags && pageContext.menuTags.length > 0
    ? pageContext.menuTags[0].count
    : 0
  const calcColor = (s) => {
    let rgb = {
      r: 255,
      g: 255,
      b: 255,
    }
    for (let i = 0; i < s.length; i++) {
      const hue = i % 3
      if (hue == 0) {
        rgb.r ^= s.charCodeAt(i)
      } else if (hue == 1) {
        rgb.g ^= s.charCodeAt(i)
      } else {
        rgb.b ^= s.charCodeAt(i)
      }
    }
    rgb.r %= 256
    rgb.g %= 256
    rgb.b %= 256
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }
  
  return (
    <Layout pageContext={pageContext}>
      <SEO title="All tags"/>
      <article>
        <header css={styles.postHeader}>
          <Notice>STATUS</Notice>
          <h1>All tags</h1>
          <div css={styles.postMeta}>
          </div>
        </header>
        <section css={styles.postBody}>
          <ul css={{
            marginTop: `calc(1.5rem - 40px)`,
            marginLeft: 0,
          }}>
            {pageContext.menuTags
              .map(({ name, count }) => ({
                name: name,
                count: count,
                size: 10 + (maxTagCount ? count / maxTagCount * 30 : 0)
              }))
              .map(({ name, count, size }) => (
                <li css={{
                  fontSize: `${size}px`,
                  lineHeight: `${size}px`,
                  display: `inline-block`,
                  marginRight: `${size * 0.5}px`,
                  marginTop: `${size * 0.5}px`,
                }}>
                  <Link to={`/tag/${name}`} rel={`/tag/${name}`} css={{
                    color: `${calcColor(name)} !important`,
                  }}>{name} ({count})</Link>
                </li>
              ))
            }
          </ul>
        </section>
      </article>
      <Bio />
    </Layout>
  )
}

export default TagsTemplate
