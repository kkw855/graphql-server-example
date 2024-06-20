import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './schema'
import db from './_db'

const PORT = 4000

const resolvers = {
  Query: {
    games: () => db.games,
    game: (_: unknown, args: { id: string }) =>
      db.games.find((game) => game.id === args.id),
    authors: () => db.authors,
    author: (_: unknown, { id }: { id: string }) =>
      db.authors.find((author) => author.id === id),
    reviews: () => db.reviews,
    review: (_: unknown, args: { id: string }) =>
      db.reviews.find((review) => review.id === args.id),
  },
}

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: {
    port: PORT,
  },
})

console.log(`🚀  Server ready at ${url.toString()}`)
