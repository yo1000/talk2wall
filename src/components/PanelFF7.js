import React from "react";
import {css} from "@emotion/react";

/**
 *
 * @param {?string} label
 * @constructor
 */
export default function PanelFF7({label, ...props}) {
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
