const express = require('express');
const { User } = require('../db/models');

const friendsRouter = express.Router();

friendsRouter.get('/', async (req, res) => {
  const friends = await User.findAll();
  res.json(friends);
});

module.exports = friendsRouter;
