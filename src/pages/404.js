import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const pickupTags = data.site.siteMetadata.pickupTags

  return (
    <Layout title={siteTitle} social={social} pickupTags={pickupTags} pageContext={{ templateName: '404' }}>
      <SEO title="404: Not Found" />
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          twitter
          github
        }
        pickupTags
      }
    }
  }
`
