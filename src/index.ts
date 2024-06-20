import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './schema'
import db from './_db'

const PORT = 4000

const resolvers = {
  Query: {
    games: () => db.games,
    authors: () => db.authors,
    reviews: () => db.reviews,
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

console.log(`Server ready at ${url.toString()}:${PORT.toString()}`)
