const { User } = require("../models");
const bcrypt = require("bcrypt");

const seedUsers = async () => {
  // Stores already hashed passwords into seeded usernames
  const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
  };
  const userData = [
    {
      username: "RedBull",
      displayName: "RedBullOfficial",
      password: await hashPassword("goodDrink"),
      email: "redbull@drink.com",
    },
    {
      username: "Toyota",
      displayName: "ToyotaOfficial",
      password: await hashPassword("goodCar"),
      email: "toyota@car.com",
    },
    {
      username: "Target",
      displayName: "TargetOfficial",
      password: await hashPassword("goodStore"),
      email: "target@store.com",
    },
  ];
  User.bulkCreate(userData);
};

module.exports = seedUsers;
