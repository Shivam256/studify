const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Admin = require("../models/AdminSchema");
const User = require("../models/UserSchema");
const Course = require("../models/CourseSchema");

const signup = async (req, res) => {
  var { name, email, phone, password, cpassword } = req.body;
  console.log(req.body);
  if (!name || !email || !phone || !password || !cpassword)
    res.status(422).send("Enter all fields");
  try {
    const adminExists = await Admin.findOne({ email: email });
    const userExists = await User.findOne({ email: email });
    if (adminExists) {
      res.status(422).send("Admin with this email already exists");
    } else if (userExists) {
      res
        .status(422)
        .send("User with this email already exists. Please Login as a User");
    } else if (password !== cpassword) {
      res.status(422).send("Passwords do not match");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      const admin = new Admin({ name, email, phone, password });
      const saveAdmin = await admin.save();
      if (saveAdmin) res.status(200).send("Admin created successfully");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(200).send("Email or password cannot be blank");
    }
    const AdminLogin = await Admin.findOne({ email: email });
    if (AdminLogin) {
      const isValid = await bcrypt.compare(password, AdminLogin.password);
      if (!isValid) {
        res.status(200).send({ ok: false, message: "Incorrect Credentials" });
      } else {
        const token = jwt.sign(
          {
            _id: AdminLogin._id,
            name: AdminLogin.name,
          },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "1400000000m",
          }
        );
        return res
          .status(200)
          .send({ ok: true, message: "Login Successfull!", token, AdminLogin });
      }
    } else {
      res.status(200).send({ ok: false, message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};
const jwtVerify = async (req, res) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.send(null);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const allTeachers = await User.find({ isTeacher: true });
    res
      .status(200)
      .json({ ok: true, message: "Got All Teachers", allTeachers });
  } catch (error) {
    console.log(error);
  }
};

const getAllRequests = async (req, res) => {
  try {
    let reqArr = [];
    const TeacherRequests = await User.find({ isTeacher: false });
    for (const user of TeacherRequests) {
      if (user.idProof) reqArr.push(user);
    }
    res.status(200).json({ ok: true, message: "Got All Requests", reqArr });
  } catch (error) {
    res.send(400).send(error);
  }
};

const verifyTeacher = async (req, res) => {
  try {
    const { teacherID } = req.body;
    const verified = await User.findByIdAndUpdate(teacherID, {
      isTeacher: true,
      isPending: false,
    });
    res.status(200).json({ ok: true, message: "Teacher Verified", verified });
  } catch (error) {
    console.log(error);
  }
};

const declineRequest = async (req, res) => {
  try {
    const { teacherID } = req.body;
    const declined = await User.findByIdAndUpdate(teacherID, {
      isTeacher: false,
      idProof: null,
    });
    res.status(200).json({ ok: true, message: "Teacher Declined", declined });
  } catch (error) {
    console.log(error);
  }
};

const updateTeacherDetails = async (req, res) => {
  var { teacherId, name, phone, address, age, education, image, domain } =
    req.body.data;

  try {
    teacherId = req.body.id;
    const updatedTeacher = await User.findByIdAndUpdate(teacherId, {
      name,
      phone,
      address,
      age,
      education,
      image,
      domain,
    });
    res
      .status(200)
      .json({ ok: true, message: "Teacher Updated By Admin", updatedTeacher });
  } catch (error) {
    res.send(error);
  }
};

const removeTeacher = async (req, res) => {
  try {
    const { teacherID } = req.body;
    const removeTeacher = await User.findByIdAndUpdate(teacherID, {
      isTeacher: false,
      idProof: null,
    });
    res
      .status(200)
      .json({ ok: true, message: "Teacher Removed", removeTeacher });
  } catch (error) {
    console.log(error);
  }
};

const addCourse = async (req, res) => {
  const {
    title,
    description,
    thumbnail,
    price,
    content,
    teacherId,
    teacherName,
  } = req.body;

  try {
    let exists = await Course.findOne({ title: title });
    if (exists) {
      console.log(exists);
      res.status(200).send("Course with this name already exists");
    } else {
      let newCourse = new Course({
        title,
        description,
        thumbnail,
        price,
        content,
        teacherId,
        teacherName,
      });
      let NewCourse = await newCourse.save();
      return res
        .status(200)
        .json({ ok: true, message: "New Course Added by Admin", NewCourse });
    }
  } catch (error) {
    res.send(error);
  }
};

const updateCourse = async (req, res) => {
  const {
    title,
    description,
    thumbnail,
    price,
    content,
    teacherId,
    teacherName,
    courseId,
  } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      title,
      description,
      thumbnail,
      price,
      content,
      teacherId,
      teacherName,
    });
    return res
      .status(200)
      .json({ ok: true, message: "Course Updated by Admin", updatedCourse });
  } catch (error) {
    console.log(error);
  }
};

const deleteCourse = async (req, res) => {
  const { courseId } = req.body;
  try {
    const Delete = await Course.findByIdAndDelete(courseId);
    return res
      .status(200)
      .json({ ok: true, message: "Course Deleted by Admin", Delete });
  } catch (error) {
    res.send(error);
  }
};

const allCourses = async (req, res) => {
  try {
    let courses = await Course.find();
    return res.status(200).json({ ok: true, message: "All Courses", courses });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  signup,
  login,
  getAllTeachers,
  getAllRequests,
  verifyTeacher,
  declineRequest,
  removeTeacher,
  addCourse,
  updateCourse,
  deleteCourse,
  allCourses,
  updateTeacherDetails,
};
