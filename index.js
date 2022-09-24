import {gql, ApolloServer} from 'apollo-server'

/* * * * * * * * *
    * Escalar Types
    * - Int
    * - Float
    * - String
    * - Boolean
    * - ID
*/

const typeDefs = gql`
    type Query {
        id: ID!
        nome: String
        idade: Int
        salario: Float
        ativo: Boolean
        tecnologias: [
            String!
        ]! 
    }
`

const resolvers = {
    Query: {
        idade() {
            return 20
        },
        salario() {
            return 10000.99
        },
        nome() {
            return 'Joao'
        },
        ativo() {
            return true
        },
        id() {
            return 1231312312
        },
        tecnologias() {
            return [
                'React', 'Next', 'Node', 'JS'
            ]
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()