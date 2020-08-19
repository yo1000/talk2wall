import { css } from "@emotion/core"

import colors from "./colors"

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
    }

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
}

export default styles
