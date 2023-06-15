import {css} from "@emotion/react"

class TextColor {
    constructor({color, textShadow}) {
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
                    border-radius: 2px;
                    border-top: 2px solid #838383;
                    border-left: 2px solid #838383;
                    border-right: 2px solid #393939;
                    border-bottom: 2px solid #393939;
                    
                    color: ${themeThis.colors.white.color};
                    text-shadow: ${themeThis.colors.white.textShadow} 1px 1px;
                    background: linear-gradient(90deg,
                    rgba(68, 68, 68, 1),
                    rgba(114, 114, 114, 1)) 50%;

                    hr {
                        background-color: ${themeThis.colors.black.color};
                        border-width: 4px;
                        border-style: ridge groove groove ridge;
                        border-color: #313131 ${themeThis.colors.black.color} #747474 ${themeThis.colors.black.color};
                    }
                `
                stylesThis.cardSemiTransparency = css`
                    ${stylesThis.cardOpacity}

                    background: linear-gradient(90deg,
                    rgba(101, 101, 101, .67) 0,
                    rgba(152, 152, 152, .67) 67%
                    );
                `
            }
        }()
    }
}()

export default theme
