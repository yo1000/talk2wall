import React from "react"
import {graphql, useStaticQuery} from "gatsby";
import {GatsbyImage, StaticImage} from "gatsby-plugin-image"

import {css} from "@emotion/react"
import "@fontsource/m-plus-1p"
import "@fontsource/kanit"
import "@fontsource/niconne"
import "@fontsource/jetbrains-mono"
import theme from "../styles/theme"

const coverImageContainerStyle = css`
    max-width: 800px;
    margin: 0 auto;
    aspect-ratio: auto 2880 / 1620;

    > div:first-of-type {
        position: relative;
        width: 100%;
    }

    @media screen and (max-width: 832px) {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
`

const coverImageOverlayStyle = css`
    display: block;
    position: absolute;
    width: 100%;
    height: 140px;
    bottom: 0;
    background: linear-gradient(180deg, transparent, ${theme.colors.black.color});
`

const RootCover = () => {
    const coverTitleStyle = css`
        position: relative;
        display: block;
        width: 240px;
        bottom: 50px;
        margin: -30% auto 30%;

        @media screen and (max-width: 832px) {
            position: relative !important;
        }
    `

    return (
        <div css={coverImageContainerStyle}>
            <div>
                <StaticImage src='../images/header/cover-root.png' alt="cover"/>
                <div css={coverImageOverlayStyle}/>
            </div>
            <StaticImage
                src="../images/header/logo.png"
                alt="cover-title"
                css={coverTitleStyle}
            />
        </div>
    )
}

const TagCover = ({tagName}) => {
    const coverTitleStyle = css`
        position: relative;
        width: 100%;
        height: 64px;
        bottom: 64px;
        text-align: center;
        margin: -27% auto 27%;

        font-family: 'M PLUS 1p';
        color: ${theme.colors.white.color};
        text-shadow: ${theme.colors.white.textShadow} 1px 1px;

        @media screen and (max-width: 640px) {
            bottom: 48px;
        }
    `

    const data = useStaticQuery(graphql`{
        allImageSharp(filter: {fields: {slug: {regex: "^/header/cover-tag/[0-9]+/"}}}) {
            nodes {
                gatsbyImageData(quality: 90, placeholder: TRACED_SVG, layout: FULL_WIDTH)
            }
        }
    }`)

    const calcCoverTagIndex = (tagName) => {
        let index = 0
        for (let i = 0; i < tagName.length; i++) {
            index ^= tagName.charCodeAt(i)
        }
        return index % 14
    }

    return (
        <div css={coverImageContainerStyle}>
            <div>
                <GatsbyImage alt="cover"
                             image={data.allImageSharp.nodes[calcCoverTagIndex(tagName)].gatsbyImageData}/>
                <div css={coverImageOverlayStyle}/>
            </div>
            <h2 css={coverTitleStyle}>
                {tagName}
            </h2>
        </div>
    )
}

const TagsCover = () => {
    const coverTitleStyle = css`
        position: relative;
        display: block;
        width: 100px;
        bottom: 50px;
        margin: -30.5% auto 30.5%;

        @media screen and (max-width: 832px) {
            position: relative !important;
        }
    `

    return (
        <div css={coverImageContainerStyle}>
            <div>
                <StaticImage src='../images/header/cover-tagtag.png' alt="cover"/>
                <div css={coverImageOverlayStyle}/>
            </div>
            <StaticImage
                src="../images/header/cover-tagtag-title.png"
                alt="cover-title"
                css={coverTitleStyle}
            />
        </div>
    )
}

const AboutCover = () => {
    const coverTitleStyle = css`
        position: relative;
        display: block;
        width: 280px;
        bottom: 50px;
        margin: -32.5% auto 32.5%;

        @media screen and (max-width: 832px) {
            position: relative !important;
        }
    `

    return (
        <div css={coverImageContainerStyle}>
            <div>
                <StaticImage src='../images/header/cover-about.png' alt="cover"/>
                <div css={coverImageOverlayStyle}/>
            </div>
            <StaticImage
                src="../images/header/cover-about-message.png"
                alt="cover-title"
                css={coverTitleStyle}
            />
        </div>
    )
}

const ErrorCover = ({code}) => {
    const coverTitleStyle = css`
        position: relative;
        width: 100%;
        height: 64px;
        bottom: 64px;
        text-align: center;
        margin: -27% auto 27%;

        color: ${theme.colors.white.color};
        text-shadow: ${theme.colors.white.textShadow} 1px 1px;

        font-family: 'Niconne' !important;
        font-size: 64px;
        font-weight: 800;
    `

    return (
        <div css={coverImageContainerStyle}>
            <div css={css`margin-top: 80px;`}>
                <StaticImage src='../images/header/cover-error.png' alt="cover"/>
                <div css={coverImageOverlayStyle}/>
            </div>
            <h2 css={coverTitleStyle}>
                {code}
            </h2>
        </div>
    )
}

export {
    RootCover,
    TagCover,
    TagsCover,
    AboutCover,
    ErrorCover,
}
