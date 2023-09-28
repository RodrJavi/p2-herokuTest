const { Post } = require("../models");

const postData = [
  {
    user_id: 1,
    content: "Our drinks taste good!",
    postDate: "2023-01-12 13:30:00",
    backgroundImage: "/assets/images/volcanophoto.jpeg",
  },
  {
    user_id: 2,
    content: "Our cars are reliable!",
    postDate: "2023-04-21 02:16:18",
    backgroundImage: "/assets/images/snowyphoto.jpg",
  },
  {
    user_id: 3,
    content: "We have many products!",
    postDate: "2023-07-05 18:20:00",
    backgroundImage: "/assets/images/tornadophoto.jpeg",
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
