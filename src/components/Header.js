import React from "react"
import {css} from "@emotion/react";
import Navigation from "./Navigation";
import Title from "./Title";
import Search from "./Search";
import {graphql, useStaticQuery} from "gatsby";

export default function Header() {
    const style = css`
      position: fixed;
      top: 0;

      &, * {
        z-index: 1000;
      }

      > div {
        display: flex;
        width: 100%;
        height: 2.75rem;

        .navigation {
          position: relative;
          top: 2px;
          left: -1px;

          width: calc(100% - 11.25rem);
          height: calc(2.75rem - 8px);
          margin: 0 3px;
        }

        .title {
          position: relative;
          top: 2px;
          left: -2px;

          width: calc(11.25rem - 6px);
          height: calc(2.75rem - 8px);
        }

        .search {
          position: relative;
          top: 0;
          left: 0;

          width: calc(100% - 3rem);
          height: calc(2.75rem - 8px);
          margin: 0 auto;
        }
      }
    `

    const data = useStaticQuery(graphql`query {
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
                title
                social {
                    twitter
                    github
                }
                filteredTags
            }
        }
    }`)

    const site = data.site.siteMetadata
    const tags = data.allMarkdownRemark.nodes
        .map(node => node.frontmatter.tags)
        .reduce((acc, cur) => ([...acc, ...(cur ? Array.isArray(cur) ? cur : [cur] : [])]), [])
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
        .filter(({name}) => (!data.site.siteMetadata.filteredTags.includes(name)))
        .sort((a, b) => b.count - a.count)

    return (
        <div css={style} className="header">
            <div>
                <Navigation site={site} tags={tags}/>
                <Title>{site.title}</Title>
            </div>
            <div>
                <Search/>
            </div>
        </div>
    )
}
