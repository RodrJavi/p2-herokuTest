const router = require("express").Router();
const { User, Post, Follower } = require("../models");
const withAuth = require("../utils/auth");

// Homepage '/' route that gets following list and following posts
router.get("/", withAuth, async (req, res) => {
  try {
    // Fetching following list
    const following = await Follower.findAll({
      where: { followerId: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    // Followed Users for the list, followedusers push to include logged in users posts in feed
    const followedUsers = following.map((p) => p.get({ plain: true }));
    const followedUsersIds = following.map((follow) => follow.followedId);
    followedUsersIds.push(req.session.user_id);

    // Fetching posts based on followedUsersIds
    const posts = await Post.findAll({
      where: {
        user_id: followedUsersIds,
      },
      include: [
        {
          model: User,
          attributes: ["id", "username", "displayName"],
        },
      ],
      order: [["postDate", "DESC"]],
    });

    const userPosts = posts.map((p) => p.get({ plain: true }));

    res.render("homepage", {
      logged_in: req.session.logged_in,
      followedUsers,
      userPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Route to get signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// Route to get logged in users profile page
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    //fetching the logged in user
    const dbUserData = await User.findByPk(userId, {
      attributes: ["username", "displayName", "email"],
    });

    const user = dbUserData.get({ plain: true });
    const postPartial = true;

    // fetching the users posts
    const dbPostData = await Post.findAll({
      where: { user_id: userId },
      include: User,
      order: [["id", "DESC"]],
    });
    const userPosts = dbPostData.map((p) => p.get({ plain: true }));

    // Fetching following list
    const following = await Follower.findAll({
      where: { followerId: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    const followedUsers = following.map((p) => p.get({ plain: true }));

    const isMobileView = req.headers["user-agent"].includes("Mobile");

    res.render("profile", {
      user,
      userPosts,
      followedUsers,
      postPartial,
      isMobileView,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to get another users profile page
router.get("/profile/:username", withAuth, async (req, res) => {
  try {
    // Fetching the user
    const reqUser = req.params.username;
    const followButton = true;
    const dbUserData = await User.findOne({
      where: { username: reqUser },
      attributes: ["id", "username", "displayName"],
    });

    if (!dbUserData) {
      return res.status(404).send("User not found");
    }

    const user = dbUserData.get({ plain: true });

    // Fetching users posts
    const dbPostData = await Post.findAll({
      where: { user_id: user.id },
      include: User,
      order: [["id", "DESC"]],
    });

    if (user.id === req.session.user_id) {
      return res.redirect("/profile");
    }

    // Fetching whether the logged in user is following target user
    const following = await Follower.findOne({
      where: {
        followerId: req.session.user_id,
        followedId: dbUserData.id,
      },
    });

    var showUnfollowButton = false;

    if (following) {
      showUnfollowButton = true;
    }

    const userPosts = dbPostData.map((p) => p.get({ plain: true }));

    // Fetching following list
    const usersFollowing = await Follower.findAll({
      where: { followerId: user.id },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    const followedUsers = usersFollowing.map((p) => p.get({ plain: true }));

    const isMobileView = req.headers["user-agent"].includes("Mobile");

    res.render("profile", {
      user,
      userPosts,
      followButton,
      showUnfollowButton,
      followedUsers,
      isMobileView,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
