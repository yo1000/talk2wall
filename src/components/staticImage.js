import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

const StaticImage = ({relativePath, className, css}) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
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
      
      const imageSizes = image.node.childImageSharp.sizes
      return <Image sizes={imageSizes} className={className} css={css}/>
    }}
  />
)

export default StaticImage
