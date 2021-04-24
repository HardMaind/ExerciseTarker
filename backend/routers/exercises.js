const router = require("express").Router();
const Exercise = require("../models/exercises.model");

// get list of exercise
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});
// Get exercise by id
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});
// add new exercise
router.route("/add").post((req, res) => {
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({
    ...req.body,
    duration: duration,
    date: date,
  })
    .save()
    .then(() => {
      res.json("exercises added");
    })
    .catch((err) => {
      res.status(400).json({ Error: err?.message });
    });
});

// update exercise by ID
router.route("/update/:id").put((req, res) => {
  Exercise.findByIdAndUpdate(req.params.id, { ...req.body })
    .then(() => {
      res.json("Exercise Updated");
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});
// Delete exercise by ID
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Deleted exercise");
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

module.exports = router;
