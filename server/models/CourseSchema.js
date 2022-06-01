const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  content: [
    {
      title: {
        type: String,
        required: true,
      },
      videoURL: {
        type: String,
        required: true,
      },
      isWatched:{
        type:Boolean,
        default:false,
        required:true
      }
    },
  ],
  rates: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "USER",
      },
      rate: {
        type: Number,
        default: 0
      },
      comment:{
        type:String
      }
    }
  ],
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  doubts: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "USER",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      required: false,
    },
  ],
});

courseSchema.virtual("overallRating").get(function(){
  let total = 0;
  this.rates.map(r => {
    total += r.rate;
  })

  return Math.round(total/this.rates.length);
})

courseSchema.set('toObject', { virtuals: true });
courseSchema.set('toJSON', { virtuals: true });


const Course = mongoose.model("COURSE", courseSchema);

module.exports = Course;
