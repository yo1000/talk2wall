import React from "react"
import { css } from "@emotion/react"
import theme from "../styles/theme"
import {StaticImage} from "gatsby-plugin-image";

import "@fontsource/m-plus-1p"
import "@fontsource/kanit"
import "@fontsource/niconne"
import "@fontsource/jetbrains-mono"

const SiteFooter = ({children}) => {
    const styles = {
        footer: css`
            max-width: 800px;
            margin: 24px auto 0 auto;
            padding: 0 42px 42px;
            text-align: center;

            font-family: 'M PLUS 1p';
            word-break: break-all;
            color: ${theme.colors.white.color};

            a,
            a:hover,
            a:active,
            a:visited {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                box-shadow: none;
                text-decoration: none;
                color: ${theme.colors.blue.color};
            }

            & > div {
                display: flex;
                padding: 0 48px 0px;

                * {
                    word-break: break-word;
                }

                section {
                    margin: .25rem auto;
                    line-height: 1.25rem;
                }

                &.wing {
                    display: block;
                    margin-bottom: -8px;
                    padding: 0;
                    line-height: 1;

                    .left,
                    .right {
                        display: inline-block;
                        position: relative;
                        width: 130px;
                        vertical-align: unset;
                    }

                    .left {
                        margin: 0 10px 0 0;
                    }

                    .right {
                        margin: 0 0 0 10px;
                    }

                    .bottom {
                        margin: 20px 6px -20px;
                        width: 360px;
                        margin: 20px auto -20px;

                        > div {
                            margin: -2px;
                        }
                    }

                    @media screen and (max-width: 479px) {
                        .left,
                        .right,
                        .bottom {
                            display: none;
                        }
                    }

                    h2 {
                        display: inline-block;
                        position: relative;
                        width: 110px;
                        margin: 0 0 1em;
                        font-family: 'Niconne', cursive !important;
                        font-size: 32px;
                        vertical-align: middle;
                    }
                }

                .unisection section {
                    width: 100%;
                }

                .bisection section {
                    width: 50%;
                }
            }

            @media screen and (max-width: 640px) {
                padding: 0 0 42px;

                & > div {
                    padding: 0;
                }

                .bisection,
                .unisection {
                    padding: 0 42px;
                }
            }
        `,
    }

    return (
        <footer css={styles.footer}>
            {children}
            <div className="wing">
                <StaticImage alt="wing-left" src="../images/footer/wing-left.png" className="left"/>
                <h2>Copyright</h2>
                <StaticImage alt="wing-right" src="../images/footer/wing-right.png" className="right"/>
            </div>
            <div className="bisection">
                <section>© {new Date().getFullYear()}, yo1000 | YO!CHI KIKUCHI</section>
                <section>© 2020, Built with <a
                    href="https://www.gatsbyjs.org"
                    target="_blank" rel="noopener noreferrer">Gatsby</a></section>
            </div>
            <div className="unisection">
                <section>Copyright (C) 1999, 2019 <a
                    href="https://www.jp.square-enix.com/ffviii/guideline.html"
                    target="_blank" rel="noopener noreferrer">SQUARE ENIX CO., LTD.</a> All Rights Reserved.</section>
            </div>
            <div className="wing">
                <StaticImage alt="wing-bottom" src="../images/footer/wing-bottom.png" className="bottom"/>
            </div>
        </footer>
    )
}

export default SiteFooter
