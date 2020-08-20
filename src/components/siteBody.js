import React from "react"
import { css } from "@emotion/core"
import globalStyles from "./styles"

const rootPath = `${__PATH_PREFIX__}/`
const tagPathPrefix = `${__PATH_PREFIX__}/tag/`

const base = {
  main: css`
    position: relative;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 42px;
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

const SiteBody = ({ location, children }) => (
  <main css={
    location.pathname === rootPath ? styles.postList :
    location.pathname.indexOf(tagPathPrefix) === 0 ? styles.postList :
    styles.postContent
  }>{children}</main>
)

export default SiteBody
