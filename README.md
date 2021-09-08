
# gatsby-source-hashnode

[![npm](https://img.shields.io/npm/v/gatsby-source-hashnode.svg)](https://www.npmjs.com/package/gatsby-source-hashnode)
[![npm](https://img.shields.io/npm/dw/gatsby-source-hashnode.svg)](https://www.npmjs.com/package/gatsby-source-hashnode)
[![npm](https://badgen.net/npm/dm/gatsby-source-hashnode)]((https://www.npmjs.com/package/gatsby-source-hashnode))
[![license](https://img.shields.io/github/license/nitzano/gatsby-source-hashnode.svg)](https://github.com/nitzano/gatsby-source-hashnode/blob/master/LICENSE)


Gatsby source plugin for building websites using [Hashnode](https://hashnode.com/) as data source.


- [gatsby-source-hashnode](#gatsby-source-hashnode)
  - [Install](#install)
  - [How to use](#how-to-use)
  - [How to query](#how-to-query)
    - [Get  user posts](#get--user-posts)
    - [Get post's reading time](#get-posts-reading-time)
    - [Get user details](#get-user-details)

## Install

```bash
npm install gatsby-source-hashnode
```

## How to use

Configure the plugin in `gatsby-config.js`:

```javascript
// gatsby-config.js
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

### Get  user posts


```graphql
{
    allHashNodePost {
        edges {
            node {
                brief       # "In this article..."
                coverImage  # "http://..."
                slug        # "my-great-article"
                title       # "My Great Article"
            }
        }
    }
}
```

### Get post's reading time

(With the kind help of [reading-time](https://www.npmjs.com/package/reading-time))


```graphql
{
    allHashNodePost {
        edges {
            node {
                title
                readingTime {
                    minutes    # 2
                    text       # "2 min read"
                    time       # 120000
                    words      # 100
                }
            }
        }
    }
}
```


### Get user details

```graphql
{
    allHashNodeUser {
        edges {
            node {
                _id
                blogHandle         # "userhandle1"
                coverImage         # "https:/...
                dateJoined         # "2014-01-01T01:00:00.000Z"
                isDeactivated      # false
                isEvangelist       # true
                location           # "Canada"
                name               # "First last"
                numFollowers       # 503
                numFollowing       # 14
                numPosts           # 50
                numReactions       # 95
                photo              # "https:/...
                publicationDomain  # "blog.mydomain.."
                tagline            # "I do stuff"
                username           # "username1"
            }
        }
    }
}
```