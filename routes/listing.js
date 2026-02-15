const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

 const listing = require("../models/listing.js");
  const {isLoggeIn,isOwner,validateListing} = require("../middleware.js");
 const listingController = require("../controllers/listing.js");
 const multer = require('multer');
 const{storage} = require("../cloudConfig.js");
 const upload = multer({storage}); 




 router.route("/")
 .get( wrapAsync(listingController.index))
 .post(isLoggeIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createroute)
);




// new route
router.get("/new",isLoggeIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggeIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateroute))
.delete(isLoggeIn,isOwner, wrapAsync(listingController.deleteroute));

//edit route
router.get("/:id/edit",isLoggeIn ,isOwner, wrapAsync(listingController.editroute));




module.exports = router;