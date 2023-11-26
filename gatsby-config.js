module.exports = {
    siteMetadata: {
        title: `壁にでも話してろ`,
        author: {
            name: `yo1000 | YO!CHI KIKUCHI`,
            summary: `Loves Spring, Kotlin, Pelikan Fountain pen and FINAL FANTASY VIII!! 🍃🐦🖋️🦁️`,
        },
        description: `Then go talk to a wall.`,
        siteUrl: `https://yo1000.com/`,
        social: {
            twitter: `yoichi_kikuchi`,
            github: `yo1000`,
        },
        pagination: {
            postsPerPage: 12,
        },
        filteredTags: [
            `Tech`,
            `Beginner`,
        ],
    },
    plugins: [
        "gatsby-plugin-emotion",
        "gatsby-plugin-image",
        {
            resolve: "gatsby-plugin-google-gtag",
            options: {
                trackingIds: ["G-KL62FBMLWN"],
            },
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: `talk2wall`,
                short_name: `talk2wall`,
                start_url: `/`,
                icon: "src/images/talk2wall-icon.png",
                background_color: `#000`,
                theme_color: `#444`,
                display: `standalone`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                        },
                    },
                    `gatsby-remark-copy-linked-files`,
                ],
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
        },
        {
            resolve: 'gatsby-plugin-local-search',
            options: {
                // A unique name for the search index. This should be descriptive of
                // what the index contains. This is required.
                name: 'pages',

                // Set the search engine to create the index. This is required.
                // The following engines are supported: flexsearch, lunr
                engine: 'flexsearch',

                // Provide options to the engine. This is optional and only recommended
                // for advanced users.
                //
                // Note: Only the flexsearch engine supports options.
                engineOptions: 'speed',

                // GraphQL query used to fetch all data for the search index. This is
                // required.
                query: `
                    {
                        allMarkdownRemark {
                            nodes {
                                id
                                frontmatter {
                                    path
                                    title
                                    tags
                                }
                                rawMarkdownBody
                            }
                        }
                    }
                `,

                // Field used as the reference value for each document.
                // Default: 'id'.
                ref: 'id',

                // List of keys to index. The values of the keys are taken from the
                // normalizer function below.
                // Default: all fields
                index: ['title', 'body', 'tags'],

                // List of keys to store and make available in your UI. The values of
                // the keys are taken from the normalizer function below.
                // Default: all fields
                store: ['id', 'path', 'title', 'tags'],

                // Function used to map the result from the GraphQL query. This should
                // return an array of items to index in the form of flat objects
                // containing properties to index. The objects must contain the `ref`
                // field above (default: 'id'). This is required.
                normalizer: ({data}) =>
                    data.allMarkdownRemark.nodes.map(node => ({
                        id: node.id,
                        path: node.frontmatter.path
                            ? node.frontmatter.path
                            : node.fields.slug,
                        title: node.frontmatter.title,
                        body: node.rawMarkdownBody,
                        tags: node.frontmatter.tags,
                    })),
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                title
                                description
                                siteUrl
                                site_url: siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        serialize: ({query: {site, allMarkdownRemark}}) => {
                            return allMarkdownRemark.nodes.map(node => {
                                return Object.assign({}, node.frontmatter, {
                                    description: node.excerpt,
                                    created: node.frontmatter.created,
                                    url: `${site.siteMetadata.siteUrl}${
                                        node.frontmatter.path 
                                            ? node.frontmatter.path 
                                            : node.fields.slug
                                    }`,
                                    guid: `${site.siteMetadata.siteUrl}${node.frontmatter.path
                                        ? node.frontmatter.path
                                        : node.fields.slug}`,
                                    custom_elements: [{"content:encoded": node.html}],
                                })
                            })
                        },
                        query: `
                            {
                                allMarkdownRemark(
                                    sort: { order: DESC, fields: [frontmatter___created] },
                                ) {
                                    nodes {
                                        excerpt
                                        html
                                        fields { slug }
                                        frontmatter {
                                            title
                                            created
                                            path
                                        }
                                    }
                                }
                            }
                        `,
                        output: "/rss.xml",
                        title: "talk2wall rss feed",
                        match: "^/",
                    },
                ],
            },
        },
        `gatsby-plugin-twitter`,
    ],
};
