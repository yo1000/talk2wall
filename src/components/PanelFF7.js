import React from "react";
import {css} from "@emotion/react";

export default function PanelFF7({...props}) {
    const style = css`
      position: relative;

      &, * {
        max-width: inherit;
        height: inherit;
      }

      .content {
        position: relative;
        margin: 0;
        padding: 1.5rem 1.5rem 1rem;

        color: #e6e6e6;
        text-shadow: #202020 1px 1px;
        background: linear-gradient(165deg, #0058b0, #000068, #000021);

        border-style: ridge;
        border-width: 6px;
        border-radius: 8px;
        border-color: #dedede #c5c5c5;
      }
    `

    return (
        <div css={style} className={`panel ${props.className ?? ""}`}>
            <div className={`content`}>
                {props.children}
            </div>
        </div>
    )
}
