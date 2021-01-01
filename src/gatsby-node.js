import { gql, request } from "graphql-request";

const NODE_TYPE = "HashNodePost";

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { username }
) => {
  // check username exists
  if (!username) {
    throw new Error("no username supplied");
  }

  const variables = {
    username,
  };

  // query information
  const query = gql`
    query getPosts($username: String!) {
      user(username: $username) {
        publicationDomain
        publication {
          posts {
            cuid
            slug
            title
            brief
            coverImage
            dateAdded
            _id
            contentMarkdown
          }
        }
      }
    }
  `;

  const {
    user: { publicationDomain, publication: { posts = [] } = {} },
  } = await request("https://api.hashnode.com/", query, variables);

  const { createNode } = actions;

  posts.map((post) => {
    const { _id, contentMarkdown } = post;

    const node = {
      ...post,
      id: createNodeId(_id),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        mediaType: `text/markdown`,
        content: contentMarkdown,
        contentDigest: createContentDigest(post),
      },
    };

    createNode(node);
  });
};
