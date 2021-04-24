const router = require("express").Router();
const User = require("../models/user.model");

// get list of users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

// add new users
router.route("/add").post((req, res) => {
  const newUser = new User({ ...req.body })
    .save()
    .then(() => {
      res.json("User added");
    })
    .catch((err) => {
      res.status(400).json({ Error: err?.message });
    });
});
module.exports = router;
