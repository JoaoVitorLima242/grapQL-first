import {gql, ApolloServer} from 'apollo-server'

/* * * * * * * * *
    * Escalar Types
    * - Int
    * - Float
    * - String
    * - Boolean
    * - ID
*/

const products = [
    {
        id: 1,
        name: 'Mouse',
        price: 99.90
    },
    {
        id: 2,
        name: 'TV',
        price: 299.90
    },
    {
        id: 3,
        name: 'Notebook',
        price: 9900.90
    },
    
]

const users = [
    {
        id: 1,
        name: 'Joao',
        age: 23,
        salary: 3000,
        active: true  
    },
    {
        id: 2,
        name: 'Matheus',
        age: 13,
        salary: 0,
        active: false  
    },
    {
        id: 3,
        name: 'Joao',
        age: 26,
        salary: 3500,
        active: true  
    },
    {
        id: 4,
        name: 'Marcio',
        age: 43,
        salary: 5000,
        active: true  
    }
]

const typeDefs = gql`
    type Product {
        id: ID,
        name: String,
        price: Float
    }

    type User {
        id: ID!
        name: String
        age: Int
        salary: Float
        active: Boolean
        techs: [
            String!
        ]! 
    }

    type Query {
        users: [User],
        user(id: Int, name: String): User,
        products: [Product]
    }
`

const resolvers = {
    Query: {
        users() {
            return users
        },
        user(obj, args) {
            const {id, name} = args
            if (name) {
                return users.find(user => user.name === name)
            }
            return users.find(user => user.id === id)
        },
        products() {
            return products
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()