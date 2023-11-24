import React from "react";
import {css} from "@emotion/react";

/**
 *
 * @param {?string} label
 * @constructor
 */
export default function PanelFF10({label, ...props}) {
    const style = css`
      position: relative;

      &, * {
        max-width: inherit;
        height: inherit;
      }

      .container {
        .background {
          opacity: .95;

          .layer1,
          .layer2,
          .layer3,
          .layer4 {
            position: relative;
            top: 0;
            left: 0;
          }

          .layer1 {
            width: 100%;

            background-image: url(/images/ff10-bg.png);
            background-repeat: repeat;

            border-style: solid;
            border-width: 2px;
            border-color: #888 #666 #444;
            box-shadow: #4c2a8b 0 0 2px 2px;

            .layer2 {
              padding: 2px;

              background: linear-gradient(#6746b4, #2f1965);
              mix-blend-mode: multiply;

              .layer3 {
                border-style: solid;
                border-width: 1px;
                border-color: #888 #666 #444;

                .layer4 {
                  margin: -7px;
                  opacity: 0;
                }
              }
            }
          }
        }

        .foreground {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    `

    return (
        <div css={style} className={`panel ${props.className ?? ""}`}>
            <div className={`container`}>
                <div className={`background`}>
                    <div className={`layer1`}>
                        <div className={`layer2`}>
                            <div className={`layer3`}>
                                <div className={`layer4`}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`foreground`}>
                    <div className={`content`}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
