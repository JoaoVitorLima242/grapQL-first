const { ApolloServer } = require("apollo-server");
const graphql = require("./src/graphql");

const server = new ApolloServer({
  ...graphql,
  formatError: (err) => {
    if(err.message.startsWith('This email already registered:')) {
        return new Error(err.message)
    }
  }
});

server.listen().then(({ url }) => console.log(url));
