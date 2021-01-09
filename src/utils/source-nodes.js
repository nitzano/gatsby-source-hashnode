import readingTime from "reading-time";
import { getUserPosts } from "./get-user-posts";

const NODE_TYPE = "HashNodePost";

export async function sourceNodes(
  { actions, createNodeId, createContentDigest },
  { username }
) {
  // check username exists
  if (!username) {
    throw new Error("no username supplied");
  }

  const posts = await getUserPosts(username);

  const { createNode } = actions;

  posts.map((post) => {
    const { _id, contentMarkdown = "" } = post;

    const node = {
      ...post,
      readingTime: readingTime(contentMarkdown),
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
}
