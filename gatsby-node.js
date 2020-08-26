const { createFilePath } = require(`gatsby-source-filesystem`)
const { templates } = require(`./src/utils/templates`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const siteMetadata = (await graphql(
    `
      {
        site {
          siteMetadata {
            title
            social {
              twitter
              github
            }
            filteredTags
          }
        }
      }
    `
  )).data.site.siteMetadata

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
                description
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

  const posts = result.data.allMarkdownRemark.edges.filter(({ node }) => (
    node.fields.slug.startsWith('/posts/')
  ))

  const tags = posts
    .map(({ node }) => node.frontmatter.tags)
    .reduce((acc, cur) => ([...acc, ...(
      cur
        ? Array.isArray(cur)
          ? cur
          : [cur]
        : []
    )]), [])
    .reduce((acc, cur) => {
      const found = acc.find(({ name }) => (name === cur))
      if (found) {
        found.count++
        return acc
      } else {
        return [
          ...acc,
          { name: cur, count: 1, },
        ]
      }
    }, [])

  const menuTags = tags
    .filter(({ name }) => (!siteMetadata.filteredTags.includes(name)))
    .sort((a, b) => b.count - a.count)

  const createPageToPaginated = ({ basePath, component, limit, skip, maxPageNumber, currentPageNumber, context }) => {
    const pageParams = {
      path: `${basePath}/${currentPageNumber}`,
      component: component,
      context: {
        siteMetadata: siteMetadata,
        menuTags: menuTags,
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
    createPageToPaginated({
      basePath: '',
      component: templates.blogPostsAll.component,
      limit: limit,
      skip: skip,
      maxPageNumber: maxPageNumber,
      currentPageNumber: currentPageNumber,
      context: {
        templateName: templates.blogPostsAll.name,
      },
    })
  }

  const postsAllCount = posts.length
  const postsAllMaxPageNumber = Math.ceil(postsAllCount / postsPerPage)

  Array.from({ length: postsAllMaxPageNumber }).forEach((_, i) => {
    createPageToPaginatedBlogPostsAll({
      limit: postsPerPage,
      skip: i * postsPerPage,
      maxPageNumber: postsAllMaxPageNumber,
      currentPageNumber: i + 1,
    })
  })

  /* Create Paginated Blog posts by tag */
  tags.forEach(({ name }, _) => {
    const tag = name
    const createPageToPaginatedBlogPostsTag = ({ limit, skip, maxPageNumber, currentPageNumber, context }) => {
      createPageToPaginated({
        basePath: `/tag/${tag}`,
        component: templates.blogPostsTag.component,
        limit: limit,
        skip: skip,
        maxPageNumber: maxPageNumber,
        currentPageNumber: currentPageNumber,
        context: {
          templateName: templates.blogPostsTag.name,
          ...context
        },
      })
    }

    const postsTagCount = posts
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

  /* Create Blog post pages */
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    
    createPage({
      path: post.node.frontmatter.path
        ? post.node.frontmatter.path
        : post.node.fields.slug,
      component: templates.blogPost.component,
      context: {
        siteMetadata: siteMetadata,
        templateName: templates.blogPost.name,
        menuTags: menuTags,
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  const about = result.data.allMarkdownRemark.edges.find(({ node }) => (
    node.fields.slug == '/features/about/'
  ))

  if (about) {
    createPage({
      path: about.node.frontmatter.path
        ? about.node.frontmatter.path
        : about.node.fields.slug,
      component: templates.about.component,
      context: {
        siteMetadata: siteMetadata,
        templateName: templates.about.name,
        menuTags: menuTags,
        slug: about.node.fields.slug,
      },
    })
  }

  createPage({
    path: '/404',
    component: templates._404.component,
    context: {
      siteMetadata: siteMetadata,
      templateName: templates._404.name,
      menuTags: menuTags,
    },
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
