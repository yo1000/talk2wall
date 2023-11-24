const {resolve} = require("path");
const {createFilePath} = require("gatsby-source-filesystem");

exports.createPages = async ({graphql, actions}) => {
    const {createPage, createRedirect} = actions

    const siteMetadata = (await graphql(`
        {
            site {
                siteMetadata {
                    title
                    social {
                        twitter
                        github
                    }
                    filteredTags
                    pagination {
                        postsPerPage
                    }
                }
            }
        }
    `)).data.site.siteMetadata

    const posts = (await graphql(`
        {
            allMarkdownRemark(
                filter: {fields: {slug: {regex: "^/posts/"}}}
                sort: { fields: [fields___sortDate], order: DESC }
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        path
                        tags
                        redirect_from
                    }
                }
            }
        }
    `)).data.allMarkdownRemark.nodes

    const tags = posts
        .map(node => node.frontmatter.tags)
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

    const postsPerPage = siteMetadata.pagination.postsPerPage

    const createPaginatedPage = ({ basePath, component, limit, skip, maxIndex, currentIndex, context }) => {
        const pageParams = {
            path: `${basePath}/${currentIndex}`,
            component: component,
            context: {
                limit: limit,
                skip: skip,
                maxIndex: maxIndex,
                currentIndex: currentIndex,
                nextPath: currentIndex > 1 ? `${basePath}/${currentIndex - 1}` : null,
                prevPath: currentIndex < maxIndex ? `${basePath}/${currentIndex + 1}` : null,
                ...context,
            },
        }

        createPage(pageParams)

        if (currentIndex === 1) {
            pageParams.path = `${basePath}/`
            createPage(pageParams)
        }
    }

    /* Create Paginated Blog posts */
    const createPaginatedBlogPostsAllPage = ({ limit, skip, maxIndex, currentIndex }) => {
        createPaginatedPage({
            basePath: '',
            component: resolve(`./src/templates/PostsAll.js`),
            limit: limit,
            skip: skip,
            maxIndex: maxIndex,
            currentIndex: currentIndex,
        })
    }

    const postsAllMaxIndex = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: postsAllMaxIndex }).forEach((_, i) => {
        createPaginatedBlogPostsAllPage({
            limit: postsPerPage,
            skip: i * postsPerPage,
            maxIndex: postsAllMaxIndex,
            currentIndex: i + 1,
        })
    })

    /* Create Paginated Blog posts by Tag */
    tags.forEach(({ name }, _) => {
        const tag = name
        const createPaginatedBlogPostsTagPage = ({ limit, skip, maxIndex, currentIndex }) => {
            createPaginatedPage({
                basePath: `/tag/${tag}`,
                component: resolve(`./src/templates/PostsTagged.js`),
                limit: limit,
                skip: skip,
                maxIndex: maxIndex,
                currentIndex: currentIndex,
                context: {
                    tag: tag,
                },
            })
        }

        const postsCount = posts
            .filter(node => node.frontmatter.tags && node.frontmatter.tags.includes(tag)).length
        const postsTagMaxIndex = Math.ceil(postsCount / postsPerPage)

        Array.from({ length: postsTagMaxIndex }).forEach((_, i) => {
            createPaginatedBlogPostsTagPage({
                limit: postsPerPage,
                skip: i * postsPerPage,
                maxIndex: postsTagMaxIndex,
                currentIndex: i + 1,
            })
        })
    })

    /* Create Blog post pages */
    posts.forEach((post, index) => {
        const prev = index === posts.length - 1 ? null : posts[index + 1]
        const next = index === 0 ? null : posts[index - 1]

        createPage({
            path: post.frontmatter.path
                ? post.frontmatter.path
                : post.fields.slug,
            component: resolve(`./src/templates/Post.js`),
            context: {
                slug: post.fields.slug,
                nextPath: !next
                    ? null
                    : next.frontmatter.path
                        ? next.frontmatter.path
                        : next.fields.slug,
                nextTitle: next && next.frontmatter.title,
                prevPath: !prev
                    ? null
                    : prev.frontmatter.path
                        ? prev.frontmatter.path
                        : prev.fields.slug,
                prevTitle: prev && prev.frontmatter.title,
            },
        })
    })
}

exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions

    if (node.internal.type === `MarkdownRemark` || node.internal.type === `ImageSharp`) {
        const slug = createFilePath({node, getNode})
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode})
        createNodeField({
            node,
            name: `sortDate`,
            value: node.frontmatter.modified ?? node.frontmatter.created ?? `1970-01-01T00:00:00.000Z`,
        })
    }
}
