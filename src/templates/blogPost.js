import React from "react"
import {graphql} from "gatsby"

import {css} from "@emotion/react"
import theme from "../styles/theme"

import Bio from "../components/bio"
import Seo from "../components/seo"
import SiteHeader from "../components/siteHeader";
import SiteFooter from "../components/siteFooter";
import PostEntry from "../components/postEntry";
import PostEntryNav from "../components/postEntryNav";

const BlogPostTemplate = ({pageContext, data}) => {
    const style = css`
        position: relative;
        max-width: 760px;
        margin: 0 auto;
        padding: 0 48px;

        @media screen and (max-width: 640px) {
            padding:  0;
        }

        * {
            word-break: break-all;
            font-family: 'M PLUS 1p';
            color: ${theme.colors.white.color};
            text-shadow: ${theme.colors.white.textShadow} 1px 1px;
        }
    `

    const post = data.markdownRemark

    return (
        <main>
            <SiteHeader/>

            <Seo title={post.frontmatter.title}/>
            <div css={style}>
                <PostEntry post={post}/>
                <PostEntryNav
                    nextPath={pageContext.nextPath}
                    nextTitle={pageContext.nextTitle}
                    prevPath={pageContext.prevPath}
                    prevTitle={pageContext.prevTitle}
                />
            </div>

            <SiteFooter>
                <Bio/>
            </SiteFooter>
        </main>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
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
