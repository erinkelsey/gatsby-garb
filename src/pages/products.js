import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import netlifyIdentity from "netlify-identity-widget"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Products extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    this.getProducts()
    netlifyIdentity.on("login", user => this.getProducts(user))
    netlifyIdentity.on("logout", () => this.getProducts())
  }

  // if user is not logged in, only return public products
  // else return all products -> public/private field on Contentful
  getProducts = user => {
    const allProducts = this.props.data.allContentfulProduct.edges
    const products =
      netlifyIdentity.currentUser() !== null
        ? allProducts
        : allProducts.filter(({ node: product }) => !product.private)
    this.setState({ products: products })
  }

  render() {
    const { products } = this.state
    return (
      <Layout>
        <SEO title="Store" />
        <div>
          <h2>Garb Products</h2>
          {products.map(({ node: product }) => (
            <div key={product.id} style={{ marginBottom: "60px" }}>
              <Link
                to={`/products/${product.slug}`}
                style={{ textDecoration: "none", color: "#551a8b" }}
              >
                <h3>
                  {product.name}
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 300,
                      color: "#f60",
                    }}
                    role="img"
                    aria-label="money-bag"
                  >
                    💰{product.price}
                  </span>
                </h3>
              </Link>

              <Img style={{ maxWidth: 400 }} fluid={product.image.fluid} />
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          price
          private
          image {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export default Products
