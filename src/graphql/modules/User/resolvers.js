import db from "../../../db"

export default {
    User: {
        profile(obj) {
            return db.profiles.find(profile => profile.id === obj.profile)
        }
    },
    Query: {
        user(obj, args) {
            return db.users.find(user => user.id === args.id)
        },
        users() {
            console.log(db.users)
            return db.users
        }
    }
}