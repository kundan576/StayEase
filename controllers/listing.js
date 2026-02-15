const listing = require("../models/listing.js");

// module.exports.index =async(req,res)=>{
//    const allListing = await listing.find({});
//     res.render("listings/index.ejs",{allListing});
// };
module.exports.index = async (req, res) => {
  let { category, location } = req.query;

  let filter = {};

  // Category filter
  if (category) {
    filter.category = category;
  }

  // Search by city (case insensitive)
  if (location) {
    filter.location = new RegExp(location, "i");
  }

  const allListing = await listing.find(filter);

  res.render("listings/index.ejs", { allListing });
};



module.exports.renderNewForm = (req,res)=>{
res.render("listings/new.ejs")
};

module.exports.showListing =async (req, res) => {
  const { id } = req.params;

  const foundListing = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

  if (!foundListing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
   console.log("OWNER:", foundListing.owner);

  res.render("listings/show.ejs", { listing: foundListing });
};

module.exports.createroute =async (req,res,next)=>{
 let url = req.file.path;
 let filename = req.file.filename;
 console.log(url, "..", "filename");
 
const newListing = new listing(req.body.listing);
 newListing.owner = req.user._id;
 newListing.image = {url,filename};
 
await newListing.save();
req.flash("success","New Listing Created!");
res.redirect("/listings");

}

module.exports.editroute=async(req,res)=>{
    let {id} = req.params;
   const foundlisten = await listing.findById(id);
     if (!foundlisten) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
   res.render("listings/edit.ejs",{ listing:foundlisten});
}



module.exports.updateroute = async (req, res) => {

  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data");
  }

  let { id } = req.params;

  // Update basic fields first
  let updatedListing = await listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  //  If new image uploaded, update image
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;

    updatedListing.image = { url, filename };
    await updatedListing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};


module.exports.deleteroute=async (req,res)=>{
let {id}= req.params;
let deletelisting = await listing.findByIdAndDelete(id);
req.flash("success","Listing Deleted!");
res.redirect("/listings");
}