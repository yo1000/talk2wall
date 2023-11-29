import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {css} from "@emotion/react";

export default function Copyright() {
    const style = css`
      margin-top: 2rem;

      & > * {
        width: fit-content;
        margin: 0 auto;
      }

      .decorationOpen {
        .left,
        .right {
          display: none;
          position: relative;
          width: 130px;
          vertical-align: unset;
        }

        .left {
          margin: 0 10px 0 0;
        }

        .center {
          display: inline-block;
          position: relative;
          width: 110px;
          margin: -30px 0 0;
          font-family: var(--copyright-decoration-font-family) !important;
          font-size: 32px;
          vertical-align: middle;
        }

        .right {
          margin: 0 0 0 10px;
        }
      }

      ul {
        display: flex;
        flex-flow: wrap;
        justify-content: center;

        width: auto;
        padding: 0;

        list-style: none;

        li {
          margin: 0 .5rem;

          text-align: center;
          word-break: break-word;
        }
      }

      .decorationClose {
        .center {
          display: none;
          position: relative;
          width: 360px;
          vertical-align: unset;
          margin: 10px 0 2rem;
        }
      }

      @media (min-width: 768px) {
        .decorationOpen {
          .left,
          .right {
            display: inline-block;
          }
        }

        .decorationClose {
          .center {
            display: inline-block;
          }
        }

        ul {
          width: 768px;

          li {
            white-space: nowrap;
          }
        }
      }
    `

    return (
        <div css={style} className="copyright">
            <div className="decorationOpen">
          <span className="left">
            <StaticImage
                src="../images/footer/wing-left.png"
                alt="wing-left"
                layout="fullWidth"
                objectFit="contain"
                placeholder="blurred"
                quality={50}
                formats={[" AUTO", "WEBP", "AVIF"]}
                transformOptions={{fit: "inside", cropFocus: "attention"}}
            />
          </span>
                <span className="center">Copyright</span>
                <span className="right">
            <StaticImage
                src="../images/footer/wing-right.png"
                alt="wing-right"
                layout="fullWidth"
                objectFit="contain"
                placeholder="blurred"
                quality={50}
                formats={[" AUTO", "WEBP", "AVIF"]}
                transformOptions={{fit: "inside", cropFocus: "attention"}}
            />
          </span>
            </div>
            <ul>
                <li>(C) 2023 yo1000 | YO!CHI KIKUCHI. Built with Gatsby.</li>
                <li>Copyright (C) 1999, 2019 SQUARE ENIX CO., LTD. All Rights Reserved.</li>
            </ul>
            <div className="decorationClose">
          <span className="center">
            <StaticImage
                src="../images/footer/wing-bottom.png"
                alt="wing-bottom"
                layout="fullWidth"
                objectFit="contain"
                placeholder="blurred"
                quality={50}
                formats={["AUTO", "WEBP", "AVIF"]}
                transformOptions={{fit: "inside", cropFocus: "attention"}}
            />
          </span>
            </div>
        </div>
    )
}
