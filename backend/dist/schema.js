"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_yoga_1 = require("graphql-yoga");
const resolvers_1 = require("./resolvers");
exports.schema = (0, graphql_yoga_1.createSchema)({
    typeDefs: `
    type Query {
      getUser(username: String!): User
    }

    type Mutation {
      updateUser(username: String!, click_per_point: Int, per_click_lavel: Int, total_coins: Int, coin_lavel: Int, total_clicks: Int, current_clicks: Int): User
    }

    type User {
      id: ID!
      username: String!
      click_per_point: Int
      per_click_lavel: Int
      total_coins: Int
      coin_lavel: Int
      total_clicks: Int
      current_clicks: Int
    }
  `,
    resolvers: resolvers_1.resolvers
});
