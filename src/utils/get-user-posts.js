import { gql, request } from "graphql-request";

/**
 * Retrieves all the user posts for a specific user name
 *
 * @export
 * @param {string} username
 * @param {int} page
 */
export async function getUserPosts(username, page) {
  const variables = {
    username,
    page,
  };

  // query information
  const query = gql`
    query getPosts($username: String!, $page: Int) {
      user(username: $username) {
        publicationDomain
        publication {
          posts(page: $page) {
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
