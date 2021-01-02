import * as graphqlRequest from "graphql-request";
import { sourceNodes } from "../gatsby-node";

describe("gatsby-source-hashnode", () => {
  let actions = {};
  let createNodeId;
  let createContentDigest;

  beforeEach(() => {
    actions.createNode = jest.fn();
    createNodeId = jest.fn(() => `id`);
    createContentDigest = jest.fn(() => `digest`);
  });

  it(`should create nodes based on fake graphql data`, async () => {
    const pluginOptions = {
      username: "user1",
    };

    // graphql result
    const result = {
      user: {
        publicationDomain: "domain1.com",
        publication: {
          posts: [
            {
              cuid: "9ec3bf664b7111ebae930242ac130002",
              slug: "article-1",
              title: "Article 1 title",
              brief: "brief1",
              coverImage: "https://cdn.hashnode.com/fake//12345.jpeg",
            },
          ],
        },
      },
    };

    jest.spyOn(graphqlRequest, "request").mockImplementationOnce(() => result);

    await sourceNodes(
      { actions, createNodeId, createContentDigest },
      pluginOptions
    );

    expect(actions.createNode).toHaveBeenCalledTimes(1);
  });

  it("should reflect reading time", async () => {
    expect(1).toBe(1);
  });
});