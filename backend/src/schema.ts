import { createSchema } from 'graphql-yoga';
import { resolvers } from './resolvers';

export const schema = createSchema({
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
  resolvers
});
