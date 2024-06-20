import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { gql } from 'graphql-tag'
import { readFileSync } from 'fs'
import path from 'path'

import { Resolvers } from './types'
import db from './_db'

const typeDefs = gql(
  readFileSync(path.resolve(import.meta.dirname, './schema.graphql'), {
    encoding: 'utf-8',
  }),
)

const PORT = 4000

const resolvers: Resolvers = {
  Query: {
    games: () => db.games,
    game: (_, args) => db.games.find((game) => game.id === args.id) ?? null,
    authors: () => db.authors,
    author: (_, { id }) =>
      db.authors.find((author) => author.id === id) ?? null,
    reviews: () => db.reviews,
    review: (_, args) =>
      db.reviews.find((review) => review.id === args.id) ?? null,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

// TODO: ESLint 에러는 아님, ESLint 버전이 9 로 높아서 나는 것 같음
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
})

console.log(`
    🚀  Server is running!
    📭  Query at ${url}
`)
