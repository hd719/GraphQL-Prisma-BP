const { GraphQLServer } = require('graphql-yoga')

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
    feed: () => links
  },

  Mutation: {
    post: (parent, args) => {
      console.log(parent);
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    }
  },

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
