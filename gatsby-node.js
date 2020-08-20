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

  const createPageToPaginated = ({ basePath, component, limit, skip, maxPageNumber, currentPageNumber, context }) => {
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
        ...context,
      },
    }

    createPage(pageParams)

    if (currentPageNumber === 1) {
      pageParams.path = `${basePath}/`
      createPage(pageParams)
    }
  }

  const postsPerPage = 10

  /* Create Paginated Blog posts */
  const createPageToPaginatedBlogPostsAll = ({ limit, skip, maxPageNumber, currentPageNumber }) => {
    const templateName = "blogPostsAll"

    createPageToPaginated({
      basePath: '',
      component: path.resolve(`./src/templates/${templateName}.js`),
      limit: limit,
      skip: skip,
      maxPageNumber: maxPageNumber,
      currentPageNumber: currentPageNumber,
      context: {
        templateName: templateName,
      },
    })
  }

  const postsAllCount = result.data.allMarkdownRemark.edges.length
  const postsAllMaxPageNumber = Math.ceil(postsAllCount / postsPerPage)

  Array.from({ length: postsAllMaxPageNumber }).forEach((_, i) => {
    createPageToPaginatedBlogPostsAll({
      limit: postsPerPage,
      skip: i * postsPerPage,
      maxPageNumber: postsAllMaxPageNumber,
      currentPageNumber: i + 1,
    })
  })

  /* Create Blog post pages */
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const templateName = "blogPost"
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.path
        ? post.node.frontmatter.path
        : post.node.fields.slug,
      component: path.resolve(`./src/templates/${templateName}.js`),
      context: {
        templateName: templateName,
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  /* Create Paginated Blog posts by tag */
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
    const createPageToPaginatedBlogPostsTag = ({ limit, skip, maxPageNumber, currentPageNumber, context }) => {
      const templateName = "blogPostsTag"

      createPageToPaginated({
        basePath: `/tag/${tag}`,
        component: path.resolve(`./src/templates/${templateName}.js`),
        limit: limit,
        skip: skip,
        maxPageNumber: maxPageNumber,
        currentPageNumber: currentPageNumber,
        context: {
          templateName: templateName,
          ...context
        },
      })
    }

    const postsTagCount = result.data.allMarkdownRemark.edges
      .filter(({ node }) => node.frontmatter.tags && node.frontmatter.tags.includes(tag)).length
    const postsTagMaxPageNumber = Math.ceil(postsTagCount / postsPerPage)
  
    Array.from({ length: postsTagMaxPageNumber }).forEach((_, i) => {
      createPageToPaginatedBlogPostsTag({
        limit: postsPerPage,
        skip: i * postsPerPage,
        maxPageNumber: postsTagMaxPageNumber,
        currentPageNumber: i + 1,
        context: {
          tag: tag,
        },
      })
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
