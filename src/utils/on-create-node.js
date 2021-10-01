import debug from "debug";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { HASHNODE_NODE_TYPE } from "./consts";

const logger = debug(`gatsby-source-hashnode:onCreateNode`);

export async function onCreateNode({
  node,
  actions: { createNode },
  createNodeId,
  getCache,
}) {
  if (node.internal.type === HASHNODE_NODE_TYPE) {
    // attach cover image if exists
    const { coverImage } = node;

    if (coverImage) {
      logger(`cover image: ${coverImage}`);

      try {
        const coverImageNode = await createRemoteFileNode({
          url: coverImage,
          parentNodeId: node.id,
          getCache,
          createNode,
          createNodeId,
        });
        node.coverImage__NODE = coverImageNode.id;
      } catch (e) {
        logger.error(e);
        logger(`error while creating cover image node: ${e}`);
      }
    }
  }
}
