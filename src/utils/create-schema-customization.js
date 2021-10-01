import { typeDefs } from "./type-defs";

export function createSchemaCustomization({ actions }) {
  const { createTypes } = actions;

  // create types
  createTypes(typeDefs);
}
