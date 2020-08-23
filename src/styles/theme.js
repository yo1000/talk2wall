import { css } from "@emotion/core"

const colors = {
  white: {
    color: `#ededed`,
    textShadow: `#414131`,
  },
  gray: {
    color: `#525a52`,
    textShadow: `#a4a4a4`,
  },
  darkBlue: {
    color: `#9494a4`,
    textShadow: `#313131`,
  },
  red: {
    color: `#ff1818`,
    textShadow: `#202020`,
  },
  yellow: {
    color: `#dede08`,
    textShadow: `#292929`,
  },
  green: {
    color: `#00ff00`,
    textShadow: `#393931`,
  },
  blue: {
    color: `#6ab4ee`,
    textShadow: `#292929`,
  },
  black: {
    color: `#000`,
    textShadow: `transparent`,
  },
  lightGray: {
    color: `#aaa`,
    textShadow: `#443`,
  },
}

const base = {
  card: css`
    border-color: #747474 #313131 #313131 #747474;
    border-radius: 2px;
    border-width: 4px;
    border-style: groove ridge ridge groove;
  
    color: ${colors.white.color};
    text-shadow: ${colors.white.textShadow} 1px 1px;
    background: linear-gradient(
      90deg,
      rgba( 68,  68,  68, 1),
      rgba(114, 114, 114, 1)
    ) 50%;

    hr {
      background-color: ${colors.black.color};
      border-width: 4px;
      border-radius: 3px;
      border-style: ridge groove groove ridge;
      border-color: #313131 ${colors.black.color} #747474 ${colors.black.color};
    }
  `,
}

const styles = {
  cardOpacity: css`
    ${base.card}
  `,
  cardSemiTransparency: css`
    ${base.card}

    background: linear-gradient(
      90deg,
      rgba(101, 101, 101, .67),
      rgba(170, 170, 170, .67)
    ) 50%;
  `,
  pageNav: css`
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      list-style: none;
      margin: 24px 0;
      padding: 0;

      li {
        ${base.card}

        display: flex;
        width: 100%;
        height: 3em;
        margin: 0;
        padding: 0 1.5em;

        a {
          height: 2em;
          width: 100%;
          margin: auto 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
    
        .gatsby-image-wrapper {
          width: 6px;
          margin: auto 0;
        }
    
        &.next {
          a {
            margin-left: -6px;
          }

          .gatsby-image-wrapper {
            left: -35px;
          }
        }
  
        &.prev {
          a {
            margin-right: -6px;
          }
          
          .gatsby-image-wrapper {
            right: -35px;
          }
        }
      }
    }
  `,
}

const theme = {
  colors: colors,
  styles: styles,
}

export default theme
