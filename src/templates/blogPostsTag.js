import * as React from "react";
import {graphql} from "gatsby";

import {css} from "@emotion/react";
import theme from "../styles/theme";

import SiteHeader from "../components/siteHeader";
import SiteFooter from "../components/siteFooter";
import {TagCover} from "../components/covers";
import Seo from "../components/seo";
import Bio from "../components/bio";
import PostList from "../components/postList";
import PostListNav from "../components/postListNav";

const BlogPostsTagTemplate = ({pageContext, data}) => {
    const style = css`
        position: relative;
        display: flex;
        flex-flow: wrap;

        max-width: none;
        margin: -56px auto auto auto;
        padding: 0 48px;

        @media screen and (max-width: 640px) {
            padding: 0;
        }

        * {
            word-break: break-all;
            font-family: 'M PLUS 1p';
            color: ${theme.colors.white.color};
            text-shadow: ${theme.colors.white.textShadow} 1px 1px;
        }
    `

    return (
        <main>
            <SiteHeader>
                <TagCover tagName={pageContext.tag}/>
            </SiteHeader>

            <Seo title="All posts"/>
            <div css={style}>
                <PostList postNodes={data.allMarkdownRemark.nodes}/>
                <PostListNav nextPath={pageContext.nextPath} prevPath={pageContext.prevPath}/>
            </div>

            <SiteFooter>
                <Bio/>
            </SiteFooter>
        </main>
    )
}

export default BlogPostsTagTemplate

export const pageQuery = graphql`
    query BlogTagPostsQuery($tag: String!, $limit: Int, $skip: Int) {
        allMarkdownRemark(
            filter: {
                fields: { slug: { regex: "^/posts/" } }
                frontmatter: { tags: { eq: $tag } }
            },
            limit: $limit,
            skip: $skip,
            sort: {
                fields: [frontmatter___date],
                order: DESC
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
