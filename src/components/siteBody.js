import React from "react"
import { css } from "@emotion/core"

import { templates } from "../utils/templates"

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
      padding: 48px 0;

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
  about: css`
    ${base.main}

    margin-top: -180px;
    padding-top: 42px;

    @media screen and (max-width: 479px) {
      padding: 48px 0;

      article {
        margin: 0;
      }
    }
  `,
  error: css`
  `,
}

const SiteBody = ({ pageContext, children }) => (
  <main css={
    pageContext.templateName === templates.blogPostsAll.name ? styles.postList :
    pageContext.templateName === templates.blogPostsTag.name ? styles.postList :
    pageContext.templateName === templates.blogPost.name ? styles.postContent :
    pageContext.templateName === templates.about.name ? styles.about :
    styles.error
  }>{children}</main>
)

export default SiteBody
