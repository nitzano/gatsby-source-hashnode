import { createRemoteFileNode } from "gatsby-source-filesystem";
import readingTime from "reading-time";
import { getUserDetails } from "./get-user-details";
import { getUserPosts } from "./get-user-posts";
import { typeDefs } from "./type-defs";

export async function sourceNodes(
  { actions, createNodeId, createContentDigest, getCache },
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
  posts.map(async (post) => {
    const { _id, contentMarkdown = "", coverImage } = post;

    const nodeSchema = {
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

    // create the node
    const node = createNode(nodeSchema);

    // attach cover image if exists
    let coverImageNode;

    if (coverImage) {
      try {
        coverImageNode = await createRemoteFileNode({
          url: coverImage,
          parentNodeId: node.id,
          getCache,
          createNode,
          createNodeId,
        });
      } catch (e) {
        // ignore
      }
    }

    if (coverImageNode) {
      node.coverImage__NODE = coverImageNode.id;
    }
  });
}
