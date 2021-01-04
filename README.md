[![npm](https://img.shields.io/npm/v/gatsby-source-hashnode.svg)](https://www.npmjs.com/package/gatsby-source-hashnode)
[![npm](https://img.shields.io/npm/dw/gatsby-source-hashnode.svg)](https://www.npmjs.com/package/gatsby-source-hashnode)
[![license](https://img.shields.io/github/license/nitzano/gatsby-source-hashnode.svg)](https://github.com/nitzano/enum-converter/blob/master/LICENSE)

# gatsby-source-hashnode

Gatsby source plugin for building websites using [Hashnode](https://hashnode.com/) as data source.

## Install

```bash
npm install gatsby-source-hashnode
```



## How to use

```javascript
// in gatsby-config.js
module.exports = {
    plugins: [
        {
            resolve: "gatsby-source-hashnode",
            options: {
                username: "<HASHNODE_USERNAME>",
            },
        },
    ]
}

```

## How to query

Get all user posts:

```graphql
{
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

## License
MIT