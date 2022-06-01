const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/Auth");
const { isTeacher } = require("../middlewares/IsTeacher");
const {
  createCourse,
  deleteCourse,
  updateCourse,
  getCourse,
  getAllCourses,
  createDoubt,
  rateCourse,
} = require("../controllers/Course");

router.post("/create", isAuthenticated, isTeacher, createCourse);
router.post("/delete/:id", isAuthenticated, isTeacher, deleteCourse);
router.post("/update", isAuthenticated, isTeacher, updateCourse);
router.get("/get/:courseId", getCourse);
router.get("/getAll", getAllCourses);
router.post("/:id/doubt", isAuthenticated, createDoubt);
router.post("/rate", isAuthenticated, rateCourse);

module.exports = router;
