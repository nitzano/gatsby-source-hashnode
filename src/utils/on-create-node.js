import debug from "debug";
import { createRemoteFileNode } from "gatsby-source-filesystem";

const logger = debug(`gatsby-source-hashnode:onCreateNode`);

export async function onCreateNode({
  node,
  actions: { createNode },
  createNodeId,
  getCache,
}) {
  logger(`node type: ${node.internal.type}`);

  if (node.internal.type === "TBD") {
    // attach cover image if exists
    const { coverImage } = node;

    if (coverImage) {
      logger(`cover image: ${coverImage}`);

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
        logger(`error while creating cover image node: ${e}`);
      }
    }

    if (coverImageNode) {
      logger(`adding cover image node: ${coverImageNode}`);
      node.coverImage__NODE = coverImageNode.id;
    }
  }
}