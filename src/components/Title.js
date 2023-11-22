import React from "react";
import Panel from "./Panel";
import {css} from "@emotion/react";
import {Link} from "gatsby";

export default function Title({...props}) {
    const style = css`
      display: inline-block;

      margin: 0;
      padding: 0;

      h1 {
        display: inline-block;
        position: absolute;
        top: -1px;
        
        height: 1rem;
        line-height: 1.25rem;
        font-size: 1rem;

        inset: 0;
        padding-left: .75rem;

        a {
          text-decoration: none;
        }
      }
    `

    return (
        <div css={style} className="title">
            <Panel>
                <h1><Link to={`/`}>{props.children}</Link></h1>
            </Panel>
        </div>
    )
}
