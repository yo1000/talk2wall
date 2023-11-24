import * as React from "react";
import {graphql} from "gatsby";
import {css} from "@emotion/react";
import Seo from "../components/Seo";
import Article from "../components/Article";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BookmarksPage({data}) {
    const headerLines = 3;

    const style = css`
      position: relative;
      top: ${44 * headerLines - 2 * (headerLines - 1)}px;

      .article {
        position: relative;
        max-width: 760px;

        margin: 0 auto;
        padding: 0;

        @media screen and (max-width: 640px) {
          padding: 0;
        }
      }
    `

    return (
        <main css={style}>
            <Seo title={data.markdownRemark.frontmatter.title}/>
            <Header/>
            <Article post={data.markdownRemark}/>
            <Footer/>
        </main>
    )
}

export const pageQuery = graphql`
    query {
        markdownRemark(fields: { slug: { eq: "/ext/bookmarks/" } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                created(formatString: "YYYY-MM-DD")
                tags
            }
        }
    }
`
