import theme from "../styles/theme"
import React, {useState} from "react";
import {css} from "@emotion/react";
import {useFlexSearch} from "react-use-flexsearch";
import {graphql, Link, useStaticQuery} from "gatsby";

import "@fontsource/m-plus-1p"
import "@fontsource/kanit"
import "@fontsource/niconne"
import "@fontsource/jetbrains-mono"

const styles = {
    search: css`
        display: flex;
        position: absolute;
        top: 6px;
        width: 126px;
        height: 23px;
        margin: 0 15px;
        padding: 0;

        input {
            display: inline-block;
            position: relative;
            top: -2px;
            left: 1px;
            width: 124px;
            height: 100%;
            margin: 0;
            padding: 0;

            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            letter-spacing: 7px;
            color: ${theme.colors.white.color};
            text-shadow: ${theme.colors.white.textShadow} 1px 1px;

            background: transparent;
            border: 0;

            &:focus {
                outline: none;
            }

            &::placeholder,
            &::-ms-input-placeholder,
            &:-ms-input-placeholder {
                color: ${theme.colors.lightGray.color};
            }
        }

        .underline {
            position: absolute;
            top: 18px;
            left: 0;
            width: 122px;
            height: 2px;

            background-image: linear-gradient(
                    to right,
                    transparent,
                    ${theme.colors.white.color} 1px,
                    ${theme.colors.white.color} 9px,
                    transparent 10px,
                    transparent 4px,
                    transparent 14px
            );
            background-size: 15.5px 2px;
            background-repeat: repeat-x;

            &.shadow {
                top: 19px;
                left: 1px;
                background-image: linear-gradient(
                        to right,
                        transparent,
                        ${theme.colors.white.textShadow} 1px,
                        ${theme.colors.white.textShadow} 9px,
                        transparent 10px,
                        transparent 4px,
                        transparent 14px
                );
            }
        }
    `,
    searchResults: css`
        ${theme.styles.cardOpacity}

        position: absolute;
        top: 32px;
        left: -19px;
        width: 320px;
        padding: 4px;
        box-shadow: 0px 1px rgba(0,0,0,.2);

        @media screen and (max-width: 479px) {
            position: fixed;
            width: 100%;
            top: 48px;
            left: 0;
        }

        a,
        a:hover,
        a:active,
        a:visited {
            display: block;
            padding: 0 11px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            box-shadow: none;
            color: ${theme.colors.blue.color};
        }

        a:hover {
            background: rgba(0,0,0,.125);
        }
    `,
}

const SearchInput = () => {
    const data = useStaticQuery(graphql`query {
            localSearchPages {
                index
                store
            }
            allMarkdownRemark(
                filter: {fields: {slug: {regex: "^/posts/"}}}
                sort: {fields: [frontmatter___date], order: DESC}
            ) {
                edges {
                    node {
                        excerpt
                        frontmatter {
                            date(formatString: "YYYY-MM-DD")
                            title
                            path
                            tags
                        }
                    }
                }
            }
        }
    `)

    const [query, setQuery] = useState()
    const { index, store } = data.localSearchPages
    const results = useFlexSearch(query, index, store)

    return (<div css={styles.search}>
        <input
            type="text" placeholder="Squall"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
        />
        {results && results.length > 0
            ? <div css={styles.searchResults}>
                {results.map(page => (
                    <Link to={page.path} title={page.title}>{page.title}</Link>
                ))}
            </div>
            : ''
        }
        <div className="underline shadow"></div>
        <div className="underline"></div>
    </div>)
}

export default SearchInput
