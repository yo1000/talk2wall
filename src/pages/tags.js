import * as React from "react";
import {graphql, Link} from "gatsby";
import {css} from "@emotion/react";
import theme from "../styles/theme";

import SiteHeader from "../components/siteHeader";
import SiteFooter from "../components/siteFooter";
import {TagsCover} from "../components/covers";
import Seo from "../components/seo";
import Bio from "../components/bio";
import Notice from "../components/notice";

const TagsPage = ({data}) => {
    const style = css`
        position: relative;
        max-width: 760px;
        margin: -56px auto 0 auto;
        padding: 0 48px;

        @media screen and (max-width: 640px) {
            padding: 0;
            
            section {
                padding-left: 0;
                padding-right: 0;
            }
        }

        * {
            word-break: break-all;
            font-family: 'M PLUS 1p';
            color: ${theme.colors.white.color};
            text-shadow: ${theme.colors.white.textShadow} 1px 1px;
        }

        article {
            header {
                margin-top: -48px;
            }
        }
    `

    const postMetaStyle = css`
        margin-bottom: 1.75rem;
    `

    const postHeaderStyle = css`
        ${theme.styles.cardOpacity}

        position: relative;
        margin: 0;
        padding: 1.25rem 1.25rem 1rem;

        .notice {
            position: absolute;
            top: -10px;
            left: 4px;
        }

        h1 {
            margin: 0;
        }

        small {
            display: block;
            margin: .5rem 0 0;
        }
    `

    const postBodyStyle = css`
        ${theme.styles.cardOpacity}

        margin-bottom: 1rem;
        padding: 1.5rem;

        ul {
            padding-left: 1.25rem;
            padding-right: 1rem;
        }

        a,
        a:active,
        a:hover,
        a:visited {
            text-decoration: none;
        }
    `

    const tags = data.allMarkdownRemark.nodes
        .map(node => node.frontmatter.tags)
        .reduce((acc, cur) => ([...acc, ...(
            cur
                ? Array.isArray(cur)
                ? cur
                : [cur]
                : []
        )]), [])
        .reduce((acc, cur) => {
            const found = acc.find(({name}) => (name === cur))
            if (found) {
                found.count++
                return acc
            } else {
                return [
                    ...acc,
                    {name: cur, count: 1,},
                ]
            }
        }, [])

    const menuTags = tags
        .filter(({name}) => (!data.site.siteMetadata.filteredTags.includes(name)))
        .sort((a, b) => b.count - a.count)

    const maxTagCount = menuTags && menuTags.length > 0
        ? menuTags[0].count
        : 0

    const calcColor = (s) => {
        let rgb = {
            r: 255,
            g: 255,
            b: 255,
        }
        for (let i = 0; i < s.length; i++) {
            const hue = i % 3
            if (hue === 0) {
                rgb.r ^= s.charCodeAt(i)
            } else if (hue === 1) {
                rgb.g ^= s.charCodeAt(i)
            } else {
                rgb.b ^= s.charCodeAt(i)
            }
        }
        rgb.r %= 256
        rgb.g %= 256
        rgb.b %= 256
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    }

    return (
        <main>
            <SiteHeader>
                <TagsCover/>
            </SiteHeader>

            <Seo title="tags"/>
            <div css={style}>
                <article>
                    <header css={postHeaderStyle}>
                        <Notice>STATUS</Notice>
                        <h1>All tags</h1>
                        <div css={postMetaStyle}>
                        </div>
                    </header>
                    <section css={postBodyStyle}>
                        <ul css={{
                            marginTop: `calc(1.5rem - 40px)`,
                            marginLeft: 0,
                        }}>
                            {menuTags
                                .map(({name, count}) => ({
                                    name: name,
                                    count: count,
                                    size: 10 + (maxTagCount ? count / maxTagCount * 30 : 0)
                                }))
                                .map(({name, count, size}) => (
                                    <li css={{
                                        fontSize: `${size}px`,
                                        lineHeight: `${size}px`,
                                        display: `inline-block`,
                                        marginRight: `${size * 0.5}px`,
                                        marginTop: `${size * 0.5}px`,
                                    }}>
                                        <Link to={`/tag/${name}`} rel={`/tag/${name}`} css={{
                                            color: `${calcColor(name)} !important`,
                                        }}>{name} ({count})</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                </article>
            </div>

            <SiteFooter>
                <Bio/>
            </SiteFooter>
        </main>
    )
}

export default TagsPage

export const pageQuery = graphql`
    query TagsPageQuery {
        allMarkdownRemark(
            filter: {fields: {slug: {regex: "^/posts/"}}}
            sort: {fields: [frontmatter___date], order: DESC}
            limit: 1000
        ) {
            nodes {
                frontmatter {
                    title
                    path
                    tags
                }
            }
        }
        site {
            siteMetadata {
                filteredTags
            }
        }
    }
`
