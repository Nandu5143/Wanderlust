const express = require("express");
const router = express.Router({mergeParams : true});
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, newLoginId,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//Reviews

//Post review route

router.post("/", newLoginId, validateReview,wrapAsync(reviewController.createReview));

//Delete review route
router.delete("/:reviewId", newLoginId, isReviewAuthor, wrapAsync( reviewController.destroyReview));

module.exports = router;