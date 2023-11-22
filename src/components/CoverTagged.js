import React from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import {css} from "@emotion/react";
import {graphql, useStaticQuery} from "gatsby";

export default function CoverTagged({tagName}) {
    const style = css`
      position: relative;

      width: 100%;

      padding-top: 2.75rem;
      margin-bottom: -2.75rem;

      .imageContainer {
        max-width: 800px;
        margin: 0 auto;

        .balloonContainer {
          position: absolute;

          max-width: 240px;
          height: 100%;

          margin: 0 auto;
          inset: 0;
          top: calc(50% - 1rem);
        }

        &::after {
          content: "";

          display: block;
          position: absolute;

          width: 100%;
          height: 5.5rem;

          margin-top: -5.5rem;

          background: linear-gradient(0deg,
          rgba(0, 0, 0, 1) 0,
          rgba(0, 0, 0, 0));
        }
      }
    `

    const calcCoverIndex = (tagName) => {
        let index = 0
        for (let i = 0; i < tagName.length; i++) {
            index ^= tagName.charCodeAt(i)
        }
        return index % 14
    }

    const covers = useStaticQuery(graphql`{
        allImageSharp(filter: {fields: {slug: {regex: "^/header/cover-tag/[0-9]+/"}}}) {
            nodes {
                gatsbyImageData(quality: 50, width: 800)
            }
        }
    }`)

    return (
        <div css={style} className="cover">
            <div className="imageContainer">
                <GatsbyImage
                    image={covers.allImageSharp.nodes[calcCoverIndex(tagName)].gatsbyImageData}
                    alt="cover"
                />
                <div className="balloonContainer">
                    <h2>
                        <center>{tagName}</center>
                    </h2>
                </div>
            </div>
        </div>
    )
}
