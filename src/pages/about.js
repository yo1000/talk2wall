import * as React from "react";
import {graphql} from "gatsby";
import {css} from "@emotion/react";
import Article from "../components/Article";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CoverAbout from "../components/CoverAbout";

export default function AboutPage({data}) {
    const headerLines = 3;

    const style = css`
      position: relative;

      .postEntry {
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
            <Header/>
            <CoverAbout/>
            <Article post={data.markdownRemark}/>
            <Footer/>
        </main>
    )
}

export const pageQuery = graphql`
    query {
        markdownRemark(fields: { slug: { eq: "/ext/about/" } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                tags
            }
        }
    }
`
