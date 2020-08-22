import React from "react"
import { css } from "@emotion/core"

import theme from "../styles/theme"

const styles = {
  notice: css`
    display: flex;
    position: relative;
    top: -16px;
    left: .25rem;

    font-family: 'Kanit';
    font-size: 12px;
    font-weight: 800;
    color: ${theme.colors.darkBlue.color};
    text-transform: uppercase;
    text-shadow:
       1px  1px 1px ${theme.colors.black.color},
      -1px  1px 1px ${theme.colors.black.color},
       1px -1px 1px ${theme.colors.black.color},
      -1px -1px 1px ${theme.colors.black.color},
       1px  0px 1px ${theme.colors.black.color},
       0px  1px 1px ${theme.colors.black.color},
      -1px  0px 1px ${theme.colors.black.color},
       0px -1px 1px ${theme.colors.black.color};
  `,
}

const Notice = ({ htmlFor, children }) => (
  <label css={styles.notice} className="notice" htmlFor={htmlFor}>{children}</label>
)

export default Notice
