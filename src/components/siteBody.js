import React from "react"
import { css } from "@emotion/core"

const base = {
  main: css`
    position: relative;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 42px 42px 0;
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
}

const SiteBody = ({ templateName, children }) => (
  <main css={templateName === 'blogPostsAll' || templateName === 'blogPostsTag'
    ? styles.postList : styles.postContent
  }>{children}</main>
)

export default SiteBody
