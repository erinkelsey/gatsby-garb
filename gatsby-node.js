const path = require("path")

const { createFilePath } = require("gatsby-source-filesystem")

const PostTemplate = path.resolve("./src/templates/post-template.js")
const BlogTemplate = path.resolve("./src/templates/blog-template.js")
const ProductTemplate = path.resolve("./src/templates/product-template.js")

/**
 * Create individual slugs/file paths for each Markdown post file.
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "posts" })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

/**
 * Create pages for each individual slug that was created above for blogs,
 * as well as pages for each individual product on contentful.
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      allContentfulProduct {
        totalCount
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  /**
   * Pagination for blog posts on blog page.
   */
  const postsPerPage = 2
  const totalPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages

    createPage({
      path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    })
  })

  /**
   * Pages for products
   */
  const products = result.data.allContentfulProduct.edges
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        slug: product.slug,
      },
    })
  })
}
