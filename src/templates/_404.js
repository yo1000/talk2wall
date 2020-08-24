import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext}>
      <SEO title="404: Not Found" />
    </Layout>
  )
}

export default NotFoundPage
