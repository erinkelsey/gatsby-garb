import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data: post }) => (
  <Layout>
    <h1>{post.markdownRemark.frontmatter.title}</h1>
    <h4>
      Time to Read: {post.markdownRemark.timeToRead}{" "}
      {post.markdownRemark.timeToRead > 1 ? "minutes" : "minute"}
    </h4>
    <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
  </Layout>
)

// slug is provided on the context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
      timeToRead
    }
  }
`
