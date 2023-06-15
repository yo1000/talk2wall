import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {css} from "@emotion/react";

export default function CoverAbout() {
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

          max-width: 291px;
          height: 100%;

          margin: 0 auto;
          inset: 0;
          top: 45%;
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
        <div css={style} className={`coverAbout`}>
            <div className="imageContainer">
                <StaticImage
                    src="../../images/header/cover-about.png"
                    alt="cover"
                    layout="fullWidth"
                    objectFit="contain"
                    placeholder="blurred"
                    quality={100}
                    formats={[" AUTO", "WEBP", "AVIF"]}
                    transformOptions={{fit: "inside", cropFocus: "attention"}}
                />
                <div className="balloonContainer">
                    <StaticImage
                        src="../../images/header/cover-about-message.png"
                        alt="cover"
                        layout="fullWidth"
                        objectFit="contain"
                        placeholder="blurred"
                        quality={100}
                        formats={[" AUTO", "WEBP", "AVIF"]}
                        transformOptions={{fit: "inside", cropFocus: "attention"}}
                    />
                </div>
            </div>
        </div>
    )
}
