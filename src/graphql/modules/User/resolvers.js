const db = require("../../../db");

module.exports = {
  User: {
    profile(user) {
      return db.perfis.find((p) => p.id === user.profile_id);
    },
  },
  Query: {
    user(obj, args) {
      return db.users.find((db) => db.id === args.id);
    },
    users: () => db.users,
  },
};