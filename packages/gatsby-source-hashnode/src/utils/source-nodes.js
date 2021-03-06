import readingTime from "reading-time";
import { getUserDetails } from "./get-user-details";
import { getUserPosts } from "./get-user-posts";
import { typeDefs } from "./type-defs";

export async function sourceNodes(
  { actions, createNodeId, createContentDigest },
  { username }
) {
  const { createNode, createTypes } = actions;
  // check username exists
  if (!username) {
    throw new Error("no username supplied");
  }

  // create types
  createTypes(typeDefs);

  // create hash node user
  const userDetails = await getUserDetails(username);

  const hashNodeUser = {
    ...userDetails,
    id: createNodeId(userDetails._id),
    parent: null,
    children: [],
    internal: {
      type: "HashNodeUser",
      description: "details about the user",
      contentDigest: createContentDigest(userDetails._id),
    },
  };

  createNode(hashNodeUser);

  // get posts
  const posts = await getUserPosts(username);

  // process posts
  posts.map((post) => {
    const { _id, contentMarkdown = "" } = post;

    const node = {
      ...post,
      readingTime: readingTime(contentMarkdown),
      id: createNodeId(_id),
      parent: null,
      children: [],
      internal: {
        type: "HashNodePost",
        mediaType: `text/markdown`,
        content: contentMarkdown,
        contentDigest: createContentDigest(post),
      },
    };

    createNode(node);
  });
}
