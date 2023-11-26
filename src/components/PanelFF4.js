import React from "react";
import {css} from "@emotion/react";

export default function PanelFF4({...props}) {
    const style = css`
      position: relative;

      &, * {
        max-width: inherit;
        height: inherit;
      }

      .border {
        border-style: solid;
        border-width: 4px;
        border-radius: 4px;
        border-color: #fff;
        box-shadow: #888 0 0 0 2px;

        .content {
          position: relative;
          margin: 0;
          padding: 1.5rem 1.5rem 1rem;

          color: #e6e6e6;
          text-shadow: #202020 1px 1px;
          background: #000063;

          border-style: solid;
          border-width: 2px;
          border-radius: 0;
          border-color: #888;
        }
      }
    `

    return (
        <div css={style} className={`panel ${props.className ?? ""}`}>
            <div className={`border`}>
                <div className={`content`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
