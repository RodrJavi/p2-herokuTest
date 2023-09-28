const User = require("./User");
const Post = require("./post");
const Follower = require("./Follower");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Follower, {
  foreignKey: "followedId",
  as: "followers"
});

User.hasMany(Follower, {
  foreignKey: "followerId",
  as: "following"
})

Follower.belongsTo(User, {
  foreignKey: "followerId",
});

Follower.belongsTo(User, {
  foreignKey: "followedId",
});

module.exports = { User, Post, Follower };
