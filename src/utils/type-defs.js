import { gql } from "graphql-request";

export const typeDefs = gql`
  type HashNodePost implements Node {
    _id: String
    brief: String
    contentMarkdown: String
    coverImage: File @link(from: "coverImage__NODE")
    cuid: String
    # publication date
    dateAdded: String
    slug: String
    title: String
    readingTime: ReadingTime
  }

  # Reading time helper
  type ReadingTime {
    # full time description
    text: String
    minutes: Float
    # time (in milliseconds)
    time: Float
    words: Int
  }

  type HashNodeUser implements Node {
    _id: ID
    username: String
    name: String
    tagline: String
    isEvangelist: Boolean
    dateJoined: String
    numFollowing: Int
    numFollowers: Int
    isDeactivated: Boolean
    location: String
    photo: String
    coverImage: String
    numPosts: Int
    numReactions: Int
    blogHandle: String
    publicationDomain: String
  }
`;
