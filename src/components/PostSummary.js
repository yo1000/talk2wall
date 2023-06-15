import React from "react";
import Panel from "./Panel";
import {css} from "@emotion/react";
import {Link} from "gatsby";

/**
 *
 * @param {string} path
 * @param {string} title
 * @param {string} body
 * @param {?string} date
 * @param {?string[]} tags
 * @return {JSX.Element}
 * @constructor
 */
export default function PostSummary({path, title, body, date, tags}) {
    const titleHeight = title ? 40 : 0
    const summaryHeight = body ? 180 : 0
    const overlayHeight = title && body ? 16 : 0

    const style = css`
      position: relative;

      width: 100%;
      height: ${titleHeight + summaryHeight - overlayHeight}px;

      .title *,
      .body * {
        a {
          text-decoration: none;
        }
      }

      .title *,
      .body .attributes * {
        z-index: 1;
      }

      .title {
        position: absolute;

        width: 67%;
        height: calc(${titleHeight}px - 8px);

        top: 0;
        left: 0;

        h2 {
          margin: 0;
          padding: .125rem .5rem;

          font-size: 1rem;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .body {
        position: absolute;

        width: calc(100% - 1rem);
        height: calc(100% - .5rem);

        top: 1rem;
        left: .75rem;

        p {
          position: relative;
          z-index: 1;

          height: 6.75rem;

          margin: 0;
          padding: 1.5rem .5rem 0;

          overflow: hidden;
          text-overflow: ellipsis;
        }

        .attributes {
          display: flex;

          width: calc(100% + 8px);
          height: 2.5rem;

          margin-top: .25rem;
          inset: 0;

          .date,
          .tags {
            margin: 0;
            padding: 0 0 0 .5rem;

            overflow: hidden;
            text-overflow: ellipsis;

            * {
              margin: 0;

              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .date {
            width: 6.5rem;
          }

          .tags {
            width: calc(100% - 6.5rem);

            ul {
              padding: 0;

              li {
                display: inline-block;

                padding: 0rem .5rem 0 0;

                a {
                  color: #6ab4ee;
                  text-shadow: #292929;
                }
              }
            }
          }
        }
      }
    `

    return (
        <div css={style} className="postSummary">
            {body ? (
                <div className="body">
                    <Panel>
                        <p>
                            <Link to={path}>
                                {body}
                            </Link>
                        </p>
                        <div className="attributes">
                            <div className="date">
                                {date}
                            </div>
                            <div className="tags">
                                <ul>
                                    {tags ? (tags.map(t => (
                                        <li>
                                            <Link to={`/tag/${t}`}>#{t}</Link>
                                        </li>
                                    ))) : <></>}
                                </ul>
                            </div>
                        </div>
                    </Panel>
                </div>
            ) : <></>}
            {title ? (
                <div className="title">
                    <Panel>
                        <h2 title={title}>
                            <Link to={path}>
                                {title}
                            </Link>
                        </h2>
                    </Panel>
                </div>
            ) : <></>}
        </div>
    )
}
