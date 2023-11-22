import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {css} from "@emotion/react";

export default function Cover() {
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

    return (
        <div css={style} className={`cover`}>
            <div className="imageContainer">
                <StaticImage
                    src="../images/header/cover-root.png"
                    alt="cover"
                    layout="fullWidth"
                    objectFit="contain"
                    placeholder="blurred"
                    quality={50}
                    width={800}
                    formats={[" AUTO", "WEBP", "AVIF"]}
                    transformOptions={{fit: "inside", cropFocus: "attention"}}
                />
                <div className="balloonContainer">
                    <StaticImage
                        src="../images/header/cover-root-balloon.png"
                        alt="cover"
                        layout="fullWidth"
                        objectFit="contain"
                        placeholder="blurred"
                        quality={50}
                        formats={[" AUTO", "WEBP", "AVIF"]}
                        transformOptions={{fit: "inside", cropFocus: "attention"}}
                    />
                </div>
            </div>
        </div>
    )
}
