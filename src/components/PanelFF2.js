import React from "react";
import {css} from "@emotion/react";

export default function PanelFF2({...props}) {
    const style = css`
      position: relative;

      &, * {
        max-width: inherit;
        height: inherit;
      }

      .border {
        border-style: solid;
        border-width: 4px;
        border-radius: 8px;
        border-color: #fff;
        box-shadow: #737573 0 1px 0 3px;

        .content {
          position: relative;
          margin: 0;
          padding: 1.5rem 1.5rem 1rem;

          color: #e6e6e6;
          text-shadow: #202020 1px 1px;
          background: #0000ad;

          border-style: solid;
          border-width: 4px 4px 2px 4px;
          border-radius: 4px;
          border-color: #737573;
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
