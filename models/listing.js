const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Review = require("./review.js");
 

const listingSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description: String,
    image: {
    url: String,
    filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    category: {
  type: String,
  required: true,
  enum: [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Castles",
    "Amazing Pools",
    "Farms",
    "Camping",
    "Arctic"
  ]
},
 
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
     const Review = mongoose.model("Review");
    await Review.deleteMany({
      _id: { $in: listing.reviews }  
    });
  }
});


const listing = mongoose.model("Listing",listingSchema); //connect mongodb and app.js
module.exports = listing;