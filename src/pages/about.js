import * as React from "react";
import {graphql} from "gatsby";
import {css} from "@emotion/react";
import theme from "../styles/theme";

import SiteHeader from "../components/siteHeader";
import SiteFooter from "../components/siteFooter";
import {AboutCover} from "../components/covers";
import Seo from "../components/seo";
import Bio from "../components/bio";
import PostEntry from "../components/postEntry";

const AboutPage = ({data}) => {
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

        article {
            header {
                margin-top: -48px;
            }
        }
    `

    const post = data.markdownRemark

    return (
        <main>
            <SiteHeader>
                <AboutCover/>
            </SiteHeader>

            <Seo title="about"/>
            <div css={style}>
                <PostEntry post={post}/>
            </div>

            <SiteFooter>
                <Bio/>
            </SiteFooter>
        </main>
    )
}

export default AboutPage

export const pageQuery = graphql`
    query AboutQuery {
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
