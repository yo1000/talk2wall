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
        max-width: inherit;
        height: inherit;
      }

      .content {
        border-width: 2px;
        border-style: solid;
        border-color: var(--panel-border-color);
        box-shadow: var(--panel-box-shadow-color) 0 0 0 2px;
        background: var(--panel-background);
      }

      .label {
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
