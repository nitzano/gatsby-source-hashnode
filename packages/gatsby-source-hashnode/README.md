
[![npm](https://img.shields.io/npm/v/gatsby-source-hashnode.svg)](https://www.npmjs.com/package/gatsby-source-hashnode)
[![npm](https://img.shields.io/npm/dw/gatsby-source-hashnode.svg)](https://www.npmjs.com/package/gatsby-source-hashnode)
[![license](https://img.shields.io/github/license/nitzano/gatsby-source-hashnode.svg)](https://github.com/nitzano/enum-converter/blob/master/LICENSE)


# gatsby-source-hashnode

Gatsby source plugin for building websites using [Hashnode](https://hashnode.com/) as data source.


- [gatsby-source-hashnode](#gatsby-source-hashnode)
  - [Install](#install)
  - [How to use](#how-to-use)
  - [How to query](#how-to-query)
    - [Get  user posts](#get--user-posts)
    - [Get post reading time](#get-post-reading-time)
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
                coverImage  # "http://..."
                brief       # "In this article..."
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
                    text       # "2 min read"
                    minutes    # 2
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
                username           # "username1"
                name               # "First last"
                tagline            # "I do stuff"
                isEvangelist       # true
                dateJoined         # "2014-01-01T01:00:00.000Z"
                numFollowing       # 14
                numFollowers       # 503
                isDeactivated      # false
                location           # Canada
                photo              # https:/...
                coverImage         # https:/...
                numPosts           # 50
                numReactions       # 95
                blogHandle         # "userhandle1"
                publicationDomain  # "blog.mydomain.."
            }
        }
    }
}
```