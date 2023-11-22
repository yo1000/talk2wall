import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {css} from "@emotion/react";

export default function Bio() {
    const style = css`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      width: fit-content;
      margin: 2rem auto 0;

      & > * {
        display: inline-block;
      }

      .avatar {
        width: 38px;
        height: 88px;
        min-width: 38px;
        margin: 0 .875rem .875rem 0;
      }

      .intro {
        max-width: 305px;

        p, ul {
          margin: 0;
          padding: 0;

          li {
            list-style: none;
          }
        }
      }

      @media (min-width: 768px) {
        margin-top: 3rem;
      }
    `

    return (
        <section css={style} className="bio">
            <StaticImage
                className="avatar"
                src="../images/avatar.png"
                alt="avatar"
                layout="fullWidth"
                objectFit="contain"
                placeholder="blurred"
                quality={50}
                formats={["AUTO", "WEBP", "AVIF"]}
                transformOptions={{fit: "inside", cropFocus: "attention"}}
            />
            <div className="intro">
                <p>
                    Written by yo1000 | YO!CHI KIKUCHI<br/>
                    Loves 🌱 Spring, 🦢 Pelikan fountain pen
                    and 🦁 FINAL FANTASY VIII
                </p>
                <ul>
                    <li><a href="#">GitHub</a></li>
                </ul>
            </div>
        </section>
    )
}
