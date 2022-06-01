const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  jwtVerify,
  uploadData,
  uploadTeacherData,
  buyCourse,
  razorCallback,
  verifyPayments,
  myTeachings,
  // updateUserProgress
} = require("../controllers/Users");
const { isAuthenticated } = require("../middlewares/Auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/jwtVerify", jwtVerify);
router.get("/test", isAuthenticated);
router.post("/hi", (req, res) => {
  res.send("working");
});
router.post("/uploadData", isAuthenticated, uploadData);
router.post("/uploadTeacherData", isAuthenticated, uploadTeacherData);
router.post("/buyCourse/createorder", isAuthenticated, buyCourse);
router.post("/buyCourse/razor/callback", razorCallback);
router.post("/razor/callback", verifyPayments);

router.post("/signup", signup);
router.post("/login", login);
router.get("/jwtVerify", jwtVerify);
router.get("/test", isAuthenticated);
router.post("/uploadData", isAuthenticated, uploadData);
router.post("/uploadTeacherData", isAuthenticated, uploadTeacherData);
router.get('/myTeachings',isAuthenticated,myTeachings)
// router.post("/progress/:id",isAuthenticated, updateUserProgress)

module.exports = router;
