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
    padding-top: 42px;

    @media screen and (max-width: 479px) {
      padding: 42px 0;

      article {
        margin: 0;
      }
    }
  `,
  postContent: css`
    ${base.main}

    margin-top: 0;

    @media screen and (max-width: 479px) {
      padding: 0;

      article section {
        margin: 0;
      }
    }
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
