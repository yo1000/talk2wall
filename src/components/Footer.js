import React from "react";
import {css} from "@emotion/react";
import Copyright from "./Copyright";
import Bio from "./Bio";

export default function Footer() {
    const style = css`
      // None
    `

    return (
        <div css={style}>
            <Bio/>
            <Copyright/>
        </div>
    )
}
