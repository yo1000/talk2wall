import React from "react";
import {css} from "@emotion/react";

/**
 *
 * @param {?string} label
 * @constructor
 */
export default function PanelFF1({label, ...props}) {
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
          background: #21188c;

          border-style: solid;
          border-width: 4px 4px 2px 4px;
          border-radius: 4px;
          border-color: #737573;
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
            <div className={`border`}>
                <div className={`content`}>
                    {props.children}
                </div>
            </div>
            <label className={`label`}>{label}</label>
        </div>
    )
}
