
const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createreview=async (req, res) => {
  const { id } = req.params;

  const foundListing = await Listing.findById(id);
  const newReview = new Review(req.body.review);

newReview.author = req.user._id;
console.log(newReview);

  foundListing.reviews.push(newReview);
  await newReview.save();
  await foundListing.save();
  req.flash("success","New Review Created!");


  res.redirect(`/listings/${id}`);
};

module.exports.deletereview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted!");

  res.redirect(`/listings/${id}`);
}