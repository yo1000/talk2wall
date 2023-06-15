import * as React from "react";
import {graphql} from "gatsby";

import {css} from "@emotion/react";
import Seo from "../components/Seo";
import PostSummaryList from "../components/PostSummaryList";
import Header from "../components/Header";
import Cover from "../components/Cover";
import Footer from "../components/Footer";

export default function PostsAll({pageContext, data}) {
    const style = css`
      // None
    `

    return (
        <main css={style}>
            <Seo title="All posts"/>
            <Header/>
            <Cover/>
            <PostSummaryList
                postSummaries={data.allMarkdownRemark.nodes.map(n => ({
                    path: n.frontmatter.path ? n.frontmatter.path : n.fields.slug,
                    title: n.frontmatter.title,
                    body: n.excerpt,
                    date: n.frontmatter.date,
                    tags: n.frontmatter.tags,
                }))}
                nextPath={pageContext.nextPath}
                prevPath={pageContext.prevPath}
            />
            <Footer/>
        </main>
    )
}

export const pageQuery = graphql`
    query ($limit: Int, $skip: Int) {
        allMarkdownRemark(
            filter: {
                fields: { slug: { regex: "^/posts/" } }
            },
            limit: $limit,
            skip: $skip,
            sort: {
                frontmatter: { date: DESC }
            }
        ) {
            nodes {
                excerpt(truncate: false)
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "YYYY-MM-DD")
                    title
                    path
                    tags
                }
            }
        }
    }
`
