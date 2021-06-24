import theme from "../styles/theme";
import {StaticImage} from "gatsby-plugin-image";
import {Link} from "gatsby";
import * as React from "react";
import {css} from "@emotion/react";

const PostListNav = ({nextPath, prevPath}) => {
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
                {nextPath && (
                    <li className="next">
                        <StaticImage src="../images/arrow-left.png"/>
                        <Link to={nextPath} rel="next" className="next">
                            Newer posts
                        </Link>
                    </li>
                )}
                {prevPath && (
                    <li className="prev">
                        <Link to={prevPath} rel="prev" className="prev">
                            Older posts
                        </Link>
                        <StaticImage src="../images/arrow-right.png"/>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default PostListNav
