import React from "react";
import {css} from "@emotion/react";
import Copyright from "./Copyright";
import Bio from "./Bio";

export default function Footer() {
    const style = css`
      position: relative;
    `

    return (
        <div css={style}>
            <Bio/>
            <Copyright/>
        </div>
    )
}
