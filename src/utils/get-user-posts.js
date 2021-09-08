import { gql, request } from "graphql-request";

/**
 * Retrieves all the user posts for a specific userName
 *
 * @export
 * @param {string} username
 */
export async function getUserPosts(username) {
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
            _id
            brief
            contentMarkdown
            coverImage
            cuid
            dateAdded
            slug
            title
          }
        }
      }
    }
  `;

  const {
    user: { publication: { posts = [] } = {} },
  } = await request("https://api.hashnode.com/", query, variables);

  return posts;
}
