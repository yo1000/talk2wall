import React from "react"
import { css } from "@emotion/react"
import theme from "../styles/theme"

import "@fontsource/m-plus-1p"
import "@fontsource/kanit"
import "@fontsource/niconne"
import "@fontsource/jetbrains-mono"

const styles = {
  notice: css`
    display: flex;
    position: absolute;
    top: -16px;
    left: 4px;

    font-family: 'Kanit' !important;
    font-size: 12px;
    font-weight: 800;
    color: ${theme.colors.darkBlue.color} !important;
    text-transform: uppercase;
    text-shadow:
       1px  1px 1px ${theme.colors.black.color},
      -1px  1px 1px ${theme.colors.black.color},
       1px -1px 1px ${theme.colors.black.color},
      -1px -1px 1px ${theme.colors.black.color},
       1px  0px 1px ${theme.colors.black.color},
       0px  1px 1px ${theme.colors.black.color},
      -1px  0px 1px ${theme.colors.black.color},
       0px -1px 1px ${theme.colors.black.color} !important;
  `,
}

const Notice = ({ htmlFor, children }) => (
  <label css={styles.notice} className="notice" htmlFor={htmlFor}>{children}</label>
)

export default Notice
