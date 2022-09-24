import db from "../../../db"

export default {
    Query: {
        profiles() {
            return db.profiles
        }
    }
}