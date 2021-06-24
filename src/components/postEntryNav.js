import theme from "../styles/theme";
import {Link} from "gatsby";
import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {css} from "@emotion/react";

const PostEntryNav = ({nextPath, nextTitle, prevPath, prevTitle}) => {
    const nav = css`
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            list-style: none;
            margin: 24px 0;
            padding: 0;

            @media screen and (max-width: 640px) {
                margin: 0;
            }

            li {
                ${theme.styles.cardOpacity};

                display: flex;
                width: 100%;
                height: 3em;
                margin: 0;
                padding: 0 1.5em;

                @media screen and (max-width: 640px) {
                    overflow: hidden;
                }

                a,
                a:active,
                a:hover,
                a:visited {
                    box-shadow: none;
                    text-decoration: none;
                    color: ${theme.colors.blue.color};
                    text-shadow: ${theme.colors.blue.textShadow} 1px 1px;

                    height: 2em;
                    width: 100%;
                    margin: auto 0;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .gatsby-image-wrapper {
                    width: 6px;
                    margin: auto 0;
                }

                &.next {
                    a {
                        margin-left: -6px;
                    }

                    .gatsby-image-wrapper {
                        left: -35px;
                    }
                }

                &.prev {
                    a {
                        margin-right: -6px;
                    }

                    .gatsby-image-wrapper {
                        right: -35px;
                    }
                }
            }

            @media screen and (max-width: 479px) {
                margin: 0;
            }
        }
    `

    return (
        <nav css={nav}>
            <ul>
                {(nextPath && nextTitle) && (
                    <li className="next">
                        <StaticImage alt="arrow-left" src="../images/arrow-left.png"/>
                        <Link to={nextPath} rel="next" className="next">{nextTitle}</Link>
                    </li>
                )}
                {(prevPath && prevTitle) && (
                    <li className="prev">
                        <Link to={prevPath} rel="prev" className="prev">{prevTitle}</Link>
                        <StaticImage alt="arrow-right" src="../images/arrow-right.png"/>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default PostEntryNav
