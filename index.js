import {gql, ApolloServer} from 'apollo-server'

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

server.listen().then(({url}) => console.log('Rodando na URL: ' + url))