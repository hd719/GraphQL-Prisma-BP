const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./prisma/generated/prisma-client')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the very basic boilerplate set up`, // Scalar type root field
    // info: () => User! -> Object type root field
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
  },

  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
