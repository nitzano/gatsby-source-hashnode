import { gql, request } from "graphql-request";

/**
 * Retrieves user information
 *
 * @export
 * @param {string} username
 */
export async function getUser(username) {
  const variables = {
    username,
  };

  // query information
  const query = gql`
    query getUser($username: String!) {
      user(username: $username) {
        _id
        username
        name
        tagline
        isEvangelist
        dateJoined
        numFollowing
        numFollowers
        isDeactivated
        location
        photo
        coverImage
        numPosts
        numReactions
        blogHandle
        publicationDomain
      }
    }
  `;

  const { user } = await request("https://api.hashnode.com/", query, variables);

  return user;
}
