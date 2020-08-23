import React from "react"
import { css } from "@emotion/core"

const base = {
  main: css`
    position: relative;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 24px 48px 0;
  `,
}
const styles = {
  postList: css`
    ${base.main}

    margin-top: -160px;
  `,
  postContent: css`
    ${base.main}

    margin-top: 0;
  `,
  error: css`
  `,
}

const SiteBody = ({ templateName, children }) => (
  <main css={
    templateName === 'blogPostsAll' ? styles.postList :
    templateName === 'blogPostsTag' ? styles.postList :
    templateName === 'blogPost' ? styles.postContent :
    styles.error
  }>{children}</main>
)

export default SiteBody
