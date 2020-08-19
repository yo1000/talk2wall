const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                path
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  /* Create Blog post pages */
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.path
        ? post.node.frontmatter.path
        : post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  /* Create Blog posts by tag pages */
  const blogTag = path.resolve(`./src/templates/blog-tag.js`)
  const tags = result.data.allMarkdownRemark.edges
    .map(({ node }) => node.frontmatter.tags)
    .reduce((acc, cur) => {
      if (!acc && !cur) return new Array()
      if (!acc) return cur
      if (!cur) return acc

      cur.forEach((v) => {
        if (acc.indexOf(v) === -1) acc.push(v)
      })
      
      return acc
    })

  tags.forEach((tag, _) => {
    createPage({
      path: `/tag/${tag}`,
      component: blogTag,
      context: {
        tag: tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
