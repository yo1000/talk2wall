const path = require(`path`)

const names = [
  `_404`,
  `blogPost`,
  `blogPostsAll`,
  `blogPostsTag`,
]

const templates = names.reduce((acc, cur) => {
  acc[cur] = {
    name: cur,
    component: path.resolve(`./src/templates/${cur}.js`),
  }
  return acc
}, new Map())

module.exports.templates = templates
