import { sourceNodes } from "../gatsby-node";
import { getUserPosts } from "../utils/get-user-posts";

jest.mock("../utils/get-user-posts.js", () => ({
  getUserPosts: jest.fn(() => []),
}));

jest.mock("../utils/get-user-details.js", () => ({
  getUserDetails: jest.fn(() => ({
    _id: "1",
  })),
}));

describe("gatsby-source-hashnode", () => {
  let actions = {};
  let createNodeId;
  let createContentDigest;

  const pluginOptions = {
    username: "user1",
  };

  beforeEach(() => {
    actions.createNode = jest.fn();
    actions.createTypes = jest.fn();
    createNodeId = jest.fn(() => `id`);
    createContentDigest = jest.fn(() => `digest`);
  });

  it(`should get user posts`, async () => {
    // graphql result
    const mockedPosts = [
      {
        cuid: "9ec3bf664b7111ebae930242ac130002",
        slug: "article-1",
        title: "Article 1 title",
        brief: "brief1",
        coverImage: "https://cdn.hashnode.com/fake//12345.jpeg",
      },
    ];

    getUserPosts.mockReturnValueOnce(mockedPosts);

    await sourceNodes(
      { actions, createNodeId, createContentDigest },
      pluginOptions
    );

    expect(actions.createNode).toHaveBeenNthCalledWith(2);
  });

  it.only("should reflect reading time", async () => {
    // graphql result
    const mockedPosts = [
      {
        contentMarkdown: "text text text text text",
      },
    ];

    getUserPosts.mockReturnValueOnce(mockedPosts);

    await sourceNodes(
      { actions, createNodeId, createContentDigest },
      pluginOptions
    );

    expect(actions.createNode).toHaveBeenNthCalledWith(
      2,
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
