const { string } = require("joi");
const mongoose = require("mongoose");
const { create } = require("./listing");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    comment: "string",
    rating: {
        type: Number,
        min:1,
        max:5,
    },
    createAt:{
        type:Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
//module.exports = mongoose.model("Review",reviewSchema);
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;