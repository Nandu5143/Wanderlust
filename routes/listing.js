const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js")
const {newLoginId, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get( wrapAsync(listingController.index))
.post( newLoginId,
    upload.single("listing[image]"), 
    validateListing, 
    wrapAsync(listingController.createListing));



//New route
router.get("/new", newLoginId, listingController.renderForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( newLoginId, isOwner, upload.single("listing[image]"), validateListing,  wrapAsync(listingController.updateListing))
.delete(newLoginId, isOwner, wrapAsync(listingController.destroyListing));

//Edit route
router.get("/:id/edit",newLoginId,isOwner,  wrapAsync(listingController.editListing));






module.exports = router;