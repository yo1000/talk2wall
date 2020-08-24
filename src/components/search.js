import React, { Component } from "react"
import { Link, graphql, StaticQuery } from 'gatsby'
import { Index } from 'elasticlunr'
import { css } from "@emotion/core"

import theme from "../styles/theme"

const styles = {
  search: css`
    display: flex;
    position: relative;
    top: -28px;
    width: 126px;
    height: 23px;
    margin: 0 15px;
    padding: 0;

    input {
      display: inline-block;
      position: relative;
      top: -2px;
      left: 1px;
      width: 120px;
      height: 100%;
      margin: 0;
      padding: 0;

      font-family: 'Ubuntu Mono', monospace;
      font-size: 14px;
      letter-spacing: 7px;
      color: ${theme.colors.white.color};
      text-shadow: ${theme.colors.white.textShadow} 1px 1px;

      background: transparent;
      border: 0;

      &:focus {
        outline: none;
      }
    }

    .underline {
      position: absolute;
      top: 18px;
      left: 0;
      width: 126px;
      height: 2px;

      background-image: linear-gradient(
        to right,
        transparent,
        ${theme.colors.white.color} 1px,
        ${theme.colors.white.color} 9px,
        transparent 10px,
        transparent 4px,
        transparent 14px
      );
      background-size: 14px 2px;
      background-repeat: repeat-x;

      &.shadow {
        top: 19px;
        left: 1px;
        background-image: linear-gradient(
          to right,
          transparent,
          ${theme.colors.white.textShadow} 1px,
          ${theme.colors.white.textShadow} 9px,
          transparent 10px,
          transparent 4px,
          transparent 14px
        );
      }
    }
  `,
  searchResults: css`
    ${theme.styles.cardOpacity}

    position: absolute;
    top: 32px;
    left: -19px;
    width: 320px;
    padding: 4px;
    box-shadow: 0px 1px rgba(0,0,0,.2);

    a,
    a:hover,
    a:active,
    a:visited {
      display: block;
      padding: 0 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      box-shadow: none;
      color: ${theme.colors.blue.color};
    }

    a:hover {
      background: rgba(0,0,0,.125);
    }
  `,
}

class SearchInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id,
      query: ``,
      results: [],
      isActive: false,
    }
  }

  render = () => (
    <>
      <input type="text" placeholder="Squall"
        id={this.state.id}
        value={this.state.query}
        onChange={this.doSearch}
        autoComplete="off"
      />

      {this.state.results && this.state.results.length > 0 ?
        <div css={styles.searchResults}>
          {this.state.results.map(page => (
            <Link key={page.id} to={page.path}
              title={page.title}>{page.title}</Link>
          ))}
        </div>
      : ''}
    </>
  )

  getOrCreateIndex = () => this.index
    ? this.index
    : Index.load(this.props.searchIndex);
    
    doSearch = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true }) // Accept partial matches
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
      isActive: !!query,
    })
  }
}

const Search = ({ id }) => (<StaticQuery
  query = { graphql`
    query SearchIndexQuery {
      siteSearchIndex {
          index
      }
    }
  ` }
  render={ data => (
    <div css={styles.search}>
      <SearchInput placeholder="Squall" id={id}
        searchIndex={data.siteSearchIndex.index}/>
      <div className="underline shadow"></div>
      <div className="underline"></div>
    </div>
  ) }
/>)

export default Search
