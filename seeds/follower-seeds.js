const { Follower } = require("../models");

const followerData = [
  {
    followerId: 1,
    followedId: 2,
  },
  {
    followerId: 2,
    followedId: 3,
  },
];

const seedFollowers = () => Follower.bulkCreate(followerData);

module.exports = seedFollowers;
