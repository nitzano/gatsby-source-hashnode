import { sourceNodes } from "../gatsby-node";
import { getUserDetails } from "../utils/get-user-details";

jest.mock("../utils/get-user-posts.js", () => ({
  getUserPosts: jest.fn(() => []),
}));

jest.mock("../utils/get-user-details.js", () => ({
  getUserDetails: jest.fn(() => ({
    _id: "1",
  })),
}));

describe("getUserDetails", () => {
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

  it(`should get user details`, async () => {
    // graphql result
    const mockUserDetails = {
      _id: "12345",
      username: "username1",
    };

    getUserDetails.mockReturnValueOnce(mockUserDetails);

    await sourceNodes(
      { actions, createNodeId, createContentDigest },
      pluginOptions
    );

    expect(actions.createNode).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        _id: "12345",
        username: "username1",
      })
    );
  });
});
