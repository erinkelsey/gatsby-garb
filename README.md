<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Garb
</h1>

GatsbyJS blog and e-commerce shop selling shirts, creating using the Gatsby Default Starter (https://github.com/gatsbyjs/gatsby-starter-default).

- Uses **gatsby-transformer-remark** for parsing Markdown blog posts.
- Uses **gatsby-remark-images** for processing images in Markdown blog posts. Works similar to Gatsby Image processing where it automatically serves optimized images with lazy loading and reduced file sizes
- Uses Contentful Headless CMS as a content management system, and **gatsby-source-contentful**
- Uses SnipCart to manage shopping cart with **gatsby-plugin-snipcart**

## Install

    $ npm install

## Setup

### Accounts

You will need the following accounts in order to set up this project:

- Netlify -> for deployment
- Contentful -> for product content management
- SnipCart -> for ecommerce cart

### Contentful

#### Create a new project

1. Click on the Menu (hamburger icon) in the top-left corner
2. Click on Create Project
3. Select free Community project

#### Create content model

1. Click on Content model link in app bar
2. Click on Add content type button
3. Enter in Product to the Name field and click Create
4. Click on the Add Field button and add the following fields:
   - Type: Text; Name: name; Short text, exact search
   - Type: Number; Name: price; Decimal
   - Type: Media; Name: image; One file
   - Type: Text; Name: description; Short text, exact search
   - Type: Text; Name: slug; Short text, exact search
   - Type: Boolean; Name: private

#### Create content

1. Click the Content link in app bar
2. Click the Add Product button
3. Add your product details

#### Create API Keys

1. Click on Settings -> API Keys
2. Click on Add API Key
3. Add a name and save
4. Take note of the Space ID, and Content Delivery API - access token (you will need them as environment variables)

### SnipCart

1. Click on the Test option in the app bar
2. Click on Account
3. Click on API Keys
4. Save the Public Test API Key to your .env file, as described below

### Environment Variables

Create a .env file in the main project directory with the following variables:

        CONTENTFUL_SPACE_ID=your_contentful_space_id
        CONTENTFUL_ACCESS_TOKEN=your_contentful_content_delivery_api_access_token
        SNIPCART_PUBLIC_API_KEY=your_snipcart_public_test_api_key

## Format with Prettier

    $ npm run format

## Run

    $ npm start

OR:

    $ npm run develop

Deployed to:

    http://localhost:8000/

GraphiQL:

    http://localhost:8000/___graphql/

## Build

    $ npm run build

OR:

    $ gatsby build

Run production build locally:

    $ gatsby serve

Deployed to:

    http://localhost:9000/

## Deploy
