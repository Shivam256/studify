const Course = require("../models/CourseSchema");
const User = require("../models/UserSchema");

const createCourse = async (req, res) => {
  const { title, description, thumbnail, price, content, doubts } = req.body;

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
        teacherId: req.user._id,
        teacherName: req.user.name,
      });
      let NewCourse = await newCourse.save();
      return res
        .status(200)
        .json({ ok: true, message: "New Course Added by Teacher", NewCourse });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, data: error });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const Delete = await Course.findByIdAndDelete(id);
    console.log(Delete);
    return res
      .status(200)
      .json({ ok: true, message: "Course Deleted by Teacher", Delete });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};

const updateCourse = async (req, res) => {
  const { courseId, title, description, thumbnail, price, content, doubts } =
    req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      title,
      description,
      thumbnail,
      price,
      content,
      teacherId: req.user._id,
      teacherName: req.user.name,
      doubts,
    });
    return res
      .status(200)
      .json({ ok: true, message: "Course Updated by Teacher", updatedCourse });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};

const getCourse = async (req, res) => {
  // const { courseId } = req.body;
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId).populate("doubts.userId").populate("rates.user");
    return res.status(200).json({ ok: true, course });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};

const createDoubt = async (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  try {
    const course = await Course.findById(id);
    const doubt = {
      userId,
      text,
    };
    course.doubts.push(doubt);
    await course.save();

    return res
      .status(200)
      .json({ ok: true, message: "Doubt added to course", course });
  } catch (err) {
    return res.status(500).json({ ok: false, error });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({});
    return res.status(200).json({ ok: true, allCourses: allCourses });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};

const rateCourse = async (req, res) => {
  const { rate, course_id, comment } = req.body;
  const user_id = req.user._id;
  try {
    const currentCourse = await Course.findById(course_id);
    const rating = {
      user: user_id,
      rate,
      comment
    };
    currentCourse.rates.push(rating);
    await currentCourse.save();
    // let sumRating;
    // let ratesLen;
    // currentCourse.rates.map((r, idx) => {
    //   sumRating += r.rate;
    //   ratesLen = idx;
    // });
    // const averageRate = Math.ceil(sumRating / (ratesLen + 1));
    // currentCourse.rating = averageRate;
    // await currentCourse.save();
    // const updatedCourse = await Course.findByIdAndUpdate(
    //   course_id,
    //   currentCourse,
    //   { new: true }
    // );
    res.status(200).json({ ok: true, currentCourse});
  } catch (error) {
    console.log(error);
    res.status(200).json({ ok: false, error });
  }
};



module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
  createDoubt,
  rateCourse,
};
