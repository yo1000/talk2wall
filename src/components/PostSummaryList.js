import React from "react";
import {css} from "@emotion/react";
import PostSummary from "./PostSummary";
import {StaticImage} from "gatsby-plugin-image";

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

      .arrow-right,
      .arrow-left {
        position: relative;
        top: 9px;
        left: 0;
        
        width: 6px;
        height: 11px;
        margin: auto 0.5rem 0 0;
      }

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
                    title={(
                        <div>
                            <StaticImage className={`arrow-left`}
                                         alt={`arrow-left`}
                                         src={`../images/arrow-left.png`}
                                         quality={50}/>
                            <span>Newer Posts</span>
                        </div>
                    )}
                />
            ) : <></>}
            {prevPath ? (
                <PostSummary
                    path={prevPath}
                    title={(
                        <div>
                            <StaticImage className={`arrow-right`}
                                         alt={`arrow-right`}
                                         src={`../images/arrow-right.png`}
                                         quality={50}/>
                            <span>Older Posts</span>
                        </div>
                    )}
                />
            ) : <></>}
        </div>
    )
}
