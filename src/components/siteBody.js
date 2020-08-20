import React from "react"
import { css } from "@emotion/core"

const rootPath = `${__PATH_PREFIX__}/`
const tagPathPrefix = `${__PATH_PREFIX__}/tag/`

const styles = {
  rootContainer: css`
    position: relative;
    max-width: 800px;
    margin-top: -160px;
    margin-left: auto;
    margin-right: auto;
    padding: 42px;
  `,
  tagContainer: css`
    position: relative;
    max-width: 800px;
    margin-top: -180px;
    margin-left: auto;
    margin-right: auto;
    padding: 42px;
  `,
  postContainer: css`
    position: relative;
    max-width: 800px;
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    padding: 21px 42px;
  `,
}

const SiteBody = ({ location, children }) => (
  <main css={
    location.pathname === rootPath ? styles.rootContainer :
    location.pathname.indexOf(tagPathPrefix) === 0 ? styles.tagContainer :
    styles.postContainer
  }>{children}</main>
)

export default SiteBody
