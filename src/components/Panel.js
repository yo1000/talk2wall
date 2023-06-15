import React from "react";
import {css} from "@emotion/react";

/**
 *
 * @param {?string} label
 * @constructor
 */
export default function Panel({label, ...props}) {
    const style = css`
      position: relative;

      &, * {
        height: inherit;
      }

      .content {
        border-top: 2px solid #838383;
        border-left: 2px solid #838383;
        border-right: 2px solid #393939;
        border-bottom: 2px solid #393939;
        box-shadow: #292929 0 0px 0 2px;

        background: linear-gradient(90deg,
        rgba(68, 68, 68, 1) 0,
        rgba(119, 119, 119, 1) 67%);
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
            <div className={`content`}>
                {props.children}
            </div>
            <label className={`label`}>{label}</label>
        </div>
    )
}
