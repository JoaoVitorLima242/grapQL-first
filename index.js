import {gql, ApolloServer} from 'apollo-server'

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
    enum ProfileType {
        ADMIN
        NORMAL
    }

    type User {
        id: ID
        name: String,
        email: String,
        tel: String,
        profile: Profile,
    }

    type Profile {
        id: ID
        description: ProfileType
    }

    type Query {
        user(id: Int): User
        users: [User]
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
        },
        users() {
            return db
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()