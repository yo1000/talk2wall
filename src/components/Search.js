import React, {useState} from "react";
import Panel from "./Panel";
import {css} from "@emotion/react";
import {useFlexSearch} from "react-use-flexsearch";
import {graphql, Link, useStaticQuery} from "gatsby";

export default function Search() {
    const [query, setQuery] = useState()

    const data = useStaticQuery(graphql`query {
            localSearchPages {
                index
                store
            }
            allMarkdownRemark(
                filter: {fields: {slug: {regex: "^/posts/"}}}
                sort: {fields: [frontmatter___date], order: DESC}
            ) {
                edges {
                    node {
                        excerpt
                        frontmatter {
                            date(formatString: "YYYY-MM-DD")
                            title
                            path
                            tags
                        }
                    }
                }
            }
        }
    `)

    const {index, store} = data.localSearchPages
    const results = useFlexSearch(query, index, store)

    const style = css`
      display: inline-block;
      padding: 0;

      * {
        height: inherit;
      }

      input {
        z-index: 1;

        position: absolute;

        width: calc(100% - 1rem);
        height: inherit;

        padding-left: .75rem;

        background: none;
        border: 0;

        &:focus {
          outline: none;
        }
      }

      .searchResults {
        height: ${28 * ((results?.length ?? 0) + 0.5)}px;
        position: absolute;
        top: 42px;
        left: 0;
        width: 420px;
        box-shadow: 0px 1px rgba(0, 0, 0, .2);

        @media screen and (max-width: 479px) {
          position: fixed;
          width: 100%;
          top: 90px;
          left: 0;
        }

        a:first-child {
          margin-top: 7px;
        }

        a:last-child {
          margin-bottom: 7px;
        }

        a,
        a:hover,
        a:active,
        a:visited {
          height: auto;
          text-decoration: none;

          display: block;
          padding: 0 11px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          box-shadow: none;
        }

        a:hover {
          background: rgba(0, 0, 0, .125);
        }

      }
    `

    return (
        <div css={style} className="search">
            <Panel label="HELP">
                <input placeholder="検索キーワードを入力してください"
                       value={query}
                       onChange={e => setQuery(e.target.value)}
                       autoComplete="off"
                       spellCheck="false"
                />
                {results && results.length ? (
                    <Panel className={`searchResults`}>
                        {results.map(page => (
                            <Link to={page.path} title={page.title}>{page.title}</Link>
                        ))}
                    </Panel>
                ) : <></>}
            </Panel>
        </div>
    )
}
