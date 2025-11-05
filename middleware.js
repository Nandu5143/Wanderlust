const Listing = require("./models/listing.js")
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.newLoginId = (req,res,next) =>{
    
    if(!req.isAuthenticated()){
        req.session.redirectLink = req.originalUrl;
        req.flash("error", "You need to login before adding new list!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveLink = (req, res, next) =>{
    res.locals.redirectLink = req.session.redirectLink;
    next();
}

module.exports.isOwner = async (req,res, next) =>{
    let  {id}  = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if(!res.locals.currUser || !listing.owner || String(listing.owner) !== String(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of the listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing =  (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};


module.exports.isReviewAuthor = async (req,res, next) =>{
    let  {id, reviewId}  = req.params;
    let review = await Review.findById(reviewId);
    if(!review){
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    if(!res.locals.currUser || !review.author || String(review.author) !== String(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}