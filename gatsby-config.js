module.exports = {
  siteMetadata: {
    title: `壁にでも話してろ`,
    author: {
      name: `yo1000 | YO!CHI KIKUCHI`,
      summary: `Loves Spring, Kotlin, Pelikan Fountain pen and FINAL FANTASY VIII!! 🍃🐦🖋️🗡️`,
    },
    description: `Then go talk to a wall.`,
    siteUrl: `https://yo1000.com/`,
    social: {
      twitter: `yoichi_kikuchi`,
      github: `yo1000`,
    },
    pickupTags: [
      `Spring`,
      `Kotlin`,
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
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
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-119554407-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `壁にでも話してろ`,
        short_name: `talk2wall`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#1f1f1f`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [`M PLUS 1p`, `Kanit`, `Niconne`, `Ubuntu Mono`]
        }
      }
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`, `slug`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            path: node => node.frontmatter.path
              ? node.frontmatter.path
              : node.fields.slug,
            slug: node => node.rawMarkdownBody,
          },
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
