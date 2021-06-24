import * as React from "react";
import {graphql} from "gatsby";

import {css} from "@emotion/react";
import theme from "../styles/theme";

import SiteHeader from "../components/siteHeader";
import SiteFooter from "../components/siteFooter";
import {RootCover} from "../components/covers";
import Seo from "../components/seo";
import Bio from "../components/bio";
import PostList from "../components/postList";
import PostListNav from "../components/postListNav";

const BlogPostsAllTemplate = ({pageContext, data}) => {
    const style = css`
        position: relative;
        max-width: 760px;
        margin: -56px auto 0 auto;
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
                <RootCover/>
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

export default BlogPostsAllTemplate

export const pageQuery = graphql`
    query BlogAllPostsQuery($limit: Int, $skip: Int) {
        allMarkdownRemark(
            filter: {
                fields: { slug: { regex: "^/posts/" } }
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
