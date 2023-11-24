import React from "react";
import {css} from "@emotion/react";

/**
 *
 * @param {?string} label
 * @constructor
 */
export default function PanelFF6({label, ...props}) {
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

        color: #fff;
        text-shadow: #000 1px 1px;
        background: linear-gradient(
                180deg,
                #7b7bd6 0, #7b7bd6 5%,
                #7373ce 5%, #7373ce 10%,
                #6b6bc6 10%, #6b6bc6 15%,
                #6363bd 15%, #6363bd 20%,
                #5a5ab5 20%, #5a5ab5 25%,
                #5252ad 25%, #5252ad 30%,
                #4a4aa5 30%, #4a4aa5 35%,
                #42429c 35%, #42429c 40%,
                #393994 40%, #393994 45%,
                #31318c 45%, #31318c 50%,
                #292984 50%, #292984 55%,
                #21217b 55%, #21217b 60%,
                #181873 60%, #181873 65%,
                #10106b 65%, #10106b 70%,
                #080863 70%, #080863 75%,
                #00005a 75%, #00005a 80%,
                #000052 80%, #000052 85%,
                #00004a 85%, #00004a 90%,
                #000042 90%, #000042 95%,
                #000039 95%, #000039 100%
        );

        border-style: ridge;
        border-width: 6px;
        border-radius: 12px;
        border-color: #fff;
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
