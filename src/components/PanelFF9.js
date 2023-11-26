import React from "react";
import {css} from "@emotion/react";

export default function PanelFF9({...props}) {
    const style = css`
      position: relative;

      &, * {
        max-width: inherit;
        height: inherit;
      }

      .content-wrapper {
        position: relative;

        color: #c8c8c8;
        text-shadow: #282828 1px 1px;

        border-style: groove ridge ridge groove;
        border-width: 6px;
        border-radius: 20px;
        border-color: #d9d9de;

        .content {
          position: relative;
          margin: 0;

          background-image: url(/images/ff9-bg.png);
          background-repeat: repeat;

          border-style: groove;
          border-width: 5px;
          border-radius: 13px;
          border-color: #939b9b #9c9ca1 #9c9ca1 #939b9b;
        }
      }
    `

    return (
        <div css={style} className={`panel ${props.className ?? ""}`}>
            <div className={`content-wrapper`}>
                <div className={`content`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
