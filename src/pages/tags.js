import * as React from "react";
import {graphql} from "gatsby";
import {css} from "@emotion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CoverTagTag from "../components/CoverTagTag";
import TagList from "../components/TagList";
import Seo from "../components/Seo";

export default function TagsPage({data}) {
    const style = css`
      .tagList {
        position: relative;
        max-width: 760px;

        margin: 0 auto;
        padding: 0;

        @media screen and (max-width: 640px) {
          padding: 0;
        }
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
        .filter(({name}) => (!data.site.siteMetadata.filteredTags.includes(name)))
        .sort((a, b) => b.count - a.count)

    return (
        <main css={style}>
            <Seo title={`All tags`}/>
            <Header/>
            <CoverTagTag/>
            <TagList tags={tags}/>
            <Footer/>
        </main>
    )
}

export const pageQuery = graphql`
    query {
        allMarkdownRemark(
            filter: {fields: {slug: {regex: "^/posts/"}}}
            sort: {fields: [frontmatter___created], order: DESC}
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
