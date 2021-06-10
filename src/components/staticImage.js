import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

const StaticImage = ({relativePath, className, css}) => (
  <StaticQuery
    query={graphql`{
  images: allFile {
    edges {
      node {
        relativePath
        name
        childImageSharp {
          gatsbyImageData(quality: 90, placeholder: TRACED_SVG, layout: FULL_WIDTH)
        }
      }
    }
  }
}
`}

    render={(data) => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(relativePath)
      })

      if (!image) return
      
      return (
        <GatsbyImage
          image={image.node.childImageSharp.gatsbyImageData}
          className={className}
          css={css} />
      );
    }}
  />
)

export default StaticImage
