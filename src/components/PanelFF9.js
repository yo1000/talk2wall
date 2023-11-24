import React from "react";
import {css} from "@emotion/react";

/**
 *
 * @param {?string} label
 * @constructor
 */
export default function PanelFF9({label, ...props}) {
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

      .label {
        --panel-label-color: #9494a4;
        --panel-label-text-shadow-color: #000;

        display: inline-block;
        position: absolute;
        top: 0;

        height: auto;
        margin-top: -8px;
        margin-left: 6px;

        font-family: 'Kanit' !important;
        font-size: 12px;
        font-weight: 900;
        color: var(--panel-label-color) !important;
        text-transform: uppercase;

        text-shadow:
                1px 1px 0px var(--panel-label-text-shadow-color),
               -1px 1px 0px var(--panel-label-text-shadow-color),
                1px -1px 0px var(--panel-label-text-shadow-color),
               -1px -1px 0px var(--panel-label-text-shadow-color),
                1px 0px 0px var(--panel-label-text-shadow-color),
                0px 1px 0px var(--panel-label-text-shadow-color),
               -1px 0px 0px var(--panel-label-text-shadow-color),
                0px -1px 0px var(--panel-label-text-shadow-color) !important;
      }
    `

    return (
        <div css={style} className={`panel ${props.className ?? ""}`}>
            <div className={`content-wrapper`}>
                <div className={`content`}>
                    {props.children}
                </div>
            </div>
            <label className={`label`}>{label}</label>
        </div>
    )
}
