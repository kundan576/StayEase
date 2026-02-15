const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review = require("../models/review");
const {validateReview, isLoggeIn,isAuthor}= require("../middleware.js");
const reviewController = require("../controllers/review.js");


// POST review
router.post("/",isLoggeIn, validateReview, wrapAsync(reviewController.createreview));

// DELETE review
router.delete("/:reviewId",isLoggeIn,isAuthor, wrapAsync(reviewController.deletereview));

module.exports = router;

