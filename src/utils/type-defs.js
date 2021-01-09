import { gql } from "graphql-request";

export const typeDefs = gql`
  type HashNodePost implements Node {
    _id: String
    brief: String
    contentMarkdown: String
    coverImage: String
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
`;
