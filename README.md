# gatsby-source-hashnode

Gatsby source plugin for building websites using Hashnode API as data source.

## Install

```bash
npm install gatsby-source-hashnode
```

or 

```bash
yarn add gatsby-source-hashnode
```

## How to use

```javascript
// in gatsby-config.js
    {
      resolve: "gatsby-source-hashnode",
      options: {
        username: "<HASHNODE_USERNAME>",
      },
    },
```

## How to query

Get all user posts:

```graphql
    query {
      allHashNodePost {
        edges {
          node {
            coverImage
            brief
            slug
            title
          }
        }
      }
    }
```