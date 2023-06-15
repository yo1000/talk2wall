import React from "react";
import {css} from "@emotion/react";
import PostSummary from "./PostSummary";

/**
 *
 * @param {PostSummary[]} postSummaries
 * @param nextPath
 * @param prevPath
 * @return {JSX.Element}
 * @constructor
 */
export default function PostSummaryList({postSummaries, nextPath, prevPath}) {
    const style = css`
      display: grid;
      gap: 2rem;

      max-width: calc(100% - 6rem);

      justify-items: center;
      margin: auto;

      @media (min-width: 768px) {
        gap: 3rem;
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1280px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: 1536px) {
        grid-template-columns: repeat(3, 1fr);
      }
    `

    return (
        <div css={style}>
            {postSummaries.map(s => (
                <PostSummary
                    path={s.path}
                    title={s.title}
                    body={s.body}
                    date={s.date}
                    tags={s.tags}
                />
            ))}
            {nextPath ? (
                <PostSummary
                    path={nextPath}
                    title={`<< Newer Posts`}
                />
            ) : <></>}
            {prevPath ? (
                <PostSummary
                    path={prevPath}
                    title={`Older Posts >>`}
                />
            ) : <></>}
        </div>
    )
}
