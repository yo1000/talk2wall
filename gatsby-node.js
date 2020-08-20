const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createReadStream } = require("fs")

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

  const createPageToPaginated = ({ basePath, component, limit, skip, maxPageNumber, currentPageNumber }) => {
    const pageParams = {
      path: `${basePath}/${currentPageNumber}`,
      component: component,
      context: {
        limit: limit,
        skip: skip,
        maxPageNumber: maxPageNumber,
        currentPageNumber: currentPageNumber,
        nextPath: currentPageNumber > 1 ? `${basePath}/${currentPageNumber - 1}` : null,
        previousPath: currentPageNumber < maxPageNumber ? `${basePath}/${currentPageNumber + 1}` : null,
      },
    }

    createPage(pageParams)

    if (currentPageNumber === 1) {
      pageParams.path = `${basePath}/`
      createPage(pageParams)
    }
  }

  /* Create Paginated Blog posts */
  const postsCount = result.data.allMarkdownRemark.edges.length
  const postsPerPage = 10
  const maxPageNumber = Math.ceil(postsCount / postsPerPage)
  const createPageToPaginatedBlogPosts = ({ limit, skip, maxPageNumber, currentPageNumber }) => {
    createPageToPaginated({
      basePath: '',
      component: path.resolve("./src/templates/blogPostsAll.js"),
      limit: limit,
      skip: skip,
      maxPageNumber: maxPageNumber,
      currentPageNumber: currentPageNumber,
    })
  }

  Array.from({ length: maxPageNumber }).forEach((_, i) => {
    createPageToPaginatedBlogPosts({
      limit: postsPerPage,
      skip: i * postsPerPage,
      maxPageNumber: maxPageNumber,
      currentPageNumber: i + 1,
    })
  })

  /* Create Blog post pages */
  const blogPost = path.resolve(`./src/templates/blogPost.js`)
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

  /* Create Paginated Blog posts by tag */
  const blogTag = path.resolve(`./src/templates/blogPostsTag.js`)
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
