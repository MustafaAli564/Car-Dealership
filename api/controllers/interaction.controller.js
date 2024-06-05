import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';

export const favListing = async(req, res, next) => {
    try{
        const{userId, listingId} = req.body;
        const user = await User.findById(userId);
        const index = user.favourites.indexOf(listingId);
        if (index === -1) {
            user.favourites.push(listingId);
            await user.save();
            return res.status(201).json({ user, message: "Listing Added to favorites" });
        } else {
            user.favourites.splice(index, 1);
            await user.save();
            return res.status(201).json({ user, message: "Listing Removed From favorites" });
        }  
    }catch (error) {
        next(error); 
    }
}

export const unfavouriteListing = async (req, res, next) => {
    try {
        const {userId, listingId } = req.body;
        const user = await User.findById(userId)
        const index = user.favourites.indexOf(listingId);
        if (index !== -1) {
            user.favourites.splice(index, 1);
            await user.save(); 
            return res.status(200).json({ message: "Listing removed from favourites successfully." });
        } else {
            return res.status(404).json({ message: "Listing not found in favourites." });
        }
    } catch (error) {
        next(error);
    }
};


export const reportListing = async(req, res, next) => {
    try {
        const{listingId, report} = req.body;
        const listing = await Listing.findById(listingId);
        if(!listing){
            return res.status(404).json({ message: "Listing not found" });
        }

        listing.reports.push(report);
        await listing.save();
        res.status(200).json({ message: "Listing reported successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to report the listing.", error: error.message });
    }
}