import { gql } from "graphql-request";

export const typeDefs = gql`
  type HashNodePost implements Node {
    _id: String
    brief: String
    contentMarkdown: String
    coverImage: String
    cuid: String
    dateAdded: String
    slug: String
    title: String
    readingTime: ReadingTime
  }

  type ReadingTime {
    text: String
    minutes: Int
    time: Int
    words: Int
  }
`;
