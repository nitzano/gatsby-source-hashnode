import * as graphqlRequest from "graphql-request";
import { sourceNodes } from "../gatsby-node";

describe("gatsby-source-hashnode", () => {
  let actions = {};
  let createNodeId;
  let createContentDigest;

  const pluginOptions = {
    username: "user1",
  };

  beforeEach(() => {
    actions.createNode = jest.fn();
    createNodeId = jest.fn(() => `id`);
    createContentDigest = jest.fn(() => `digest`);
  });

  it(`should create nodes based on fake graphql data`, async () => {
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
    // graphql result
    const result = {
      user: {
        publicationDomain: "domain1.com",
        publication: {
          posts: [
            {
              contentMarkdown: "text text text text text",
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

    expect(actions.createNode).toHaveBeenCalledWith(
      expect.objectContaining({
        contentMarkdown: "text text text text text",
        readingTime: expect.objectContaining({
          minutes: expect.any(Number),
          words: expect.any(Number),
          text: expect.any(String),
          time: expect.any(Number),
        }),
      })
    );
  });
});
