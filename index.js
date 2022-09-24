import {gql, ApolloServer} from 'apollo-server'

/* * * * * * * * *
    * Escalar Types
    * - Int
    * - Float
    * - String
    * - Boolean
    * - ID
*/

const db = [
  {
    id: 1,
    name: "Paulo",
    email: "paulo@email.com",
    tel_fix: "11 1234 1234",
    profile: 1,
  },
  {
    id: 2,
    name: "Lucas",
    email: "lucas@email.com",
    tel_fix: "34 1234 1234",
    profile: 2,
  },
];
  
const profiles = [
  { id: 1, description: "ADMIN" },
  { id: 2, description: "NORMAL" },
];

const typeDefs = gql`
    type User {
        id: ID
        name: String,
        email: String,
        tel: String,
        profile: Profile,
    }

    type Profile {
        id: ID
        description: String
    }

    type Query {
        user(id: Int): User
        profiles: [Profile]
    }

`

const resolvers = {
    User: {
        profile(obj) {
            return profiles.find(profile => profile.id === obj.profile)
        }
    },
    Query: {
        user(obj, args) {
            return db.find(user => user.id === args.id)
        },
        profiles() {
            return profiles
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()