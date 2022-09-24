import GQLTools from 'graphql-tools'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allTypes = GQLTools.loadFilesSync(join(__dirname, 'modules', '**', '*.gql'))
const allResolvers = GQLTools.loadFilesSync(join(__dirname, 'modules', '**', 'resolvers.js'))

export const typeDefs = GQLTools.mergeTypeDefs(allTypes)
export const resolvers = GQLTools.mergeResolvers(allResolvers)