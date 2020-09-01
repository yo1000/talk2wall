import { css } from "@emotion/core"

class TextColor {
  constructor({ color, textShadow }) {
    this.color = color
    this.textShadow = textShadow
  }
}

const theme = new class Theme {
  constructor() {
    const themeThis = this
    themeThis.colors = new class Colors {
      constructor() {
        const colorsThis = this
        colorsThis.white = new TextColor({
          color: `#ededed`, textShadow: `#414131`,
        })
        colorsThis.gray = new TextColor({
          color: `#525a52`, textShadow: `#a4a4a4`,
        })
        colorsThis.darkBlue = new TextColor({
          color: `#9494a4`, textShadow: `#313131`,
        })
        colorsThis.red = new TextColor({
          color: `#ff1818`, textShadow: `#202020`,
        })
        colorsThis.yellow = new TextColor({
          color: `#dede08`, textShadow: `#292929`,
        })
        colorsThis.green = new TextColor({
          color: `#00ff00`, textShadow: `#393931`,
        })
        colorsThis.blue = new TextColor({
          color: `#6ab4ee`, textShadow: `#292929`,
        })
        colorsThis.black = new TextColor({
          color: `#000`, textShadow: `transparent`,
        })
        // TODO: Unused?
        colorsThis.lightGray = new TextColor({
          color: `#aaa`, textShadow: `443`,
        })
      }
    }()
    themeThis.styles = new class Styles {
      constructor() {
        const stylesThis = this
        stylesThis.cardOpacity = css`
          border-color: #747474 #313131 #313131 #747474;
          border-radius: 2px;
          border-width: 4px;
          border-style: groove ridge ridge groove;
        
          color: ${themeThis.colors.white.color};
          text-shadow: ${themeThis.colors.white.textShadow} 1px 1px;
          background: linear-gradient(
            90deg,
            rgba( 68,  68,  68, 1),
            rgba(114, 114, 114, 1)
          ) 50%;
      
          hr {
            background-color: ${themeThis.colors.black.color};
            border-width: 4px;
            border-style: ridge groove groove ridge;
            border-color: #313131 ${themeThis.colors.black.color} #747474 ${themeThis.colors.black.color};
          }
        `
        stylesThis.cardSemiTransparency = css`
          ${stylesThis.cardOpacity}

          background: linear-gradient(
            90deg,
            rgba(101, 101, 101, .67),
            rgba(170, 170, 170, .67)
          ) 50%;
        `
        stylesThis.pageNav = css`
          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            list-style: none;
            margin: 24px 0;
            padding: 0;
      
            li {
              ${stylesThis.cardOpacity}
      
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
      
            @media screen and (max-width: 479px) {
              margin: 0;
            }
          }
        `
      }
    }()
  }
}()

export default theme
