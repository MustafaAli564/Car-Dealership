import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';

export const favListing = async(req, res, next) => {
    try{
        const user = req.user;
        const{listingId} = req.body;
        if (!user.favourites.includes(listingId)) {
            user.favourites.push(listingId);
            await user.save();
        }
        return res.status(201).json({ listingId, message: "Listing added to favorites" });
    }catch (error) {
        next(error); 
    }
}

export const unfavouriteListing = async (req, res, next) => {
    try {
        const user = req.user;
        const { listingId } = req.body;

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

// export const contactSeller = async (req, res, next) => {
//     try {
//         const { listingId } = req.body;
//         const listing = await Listing.findById(listingId).populate('user', 'phoneNumber');
//         if (!listing) {
//             return res.status(404).json({ message: "Listing not found" });
//         }
//         const seller = await User.findById(listing.user._id);
//         if (!seller) {
//             return res.status(404).json({ message: "Seller not found" });
//         }
//         const message = `You have an interested buyer. Contact them at: ${listing.user.PhoneNumber}`;
        
//         await sendNotification(seller._id, message);

//         res.status(200).json({ message: "Notification sent to the seller successfully." });
//     } catch (error) {
//         next(error);
//     }
// };

// async function sendNotification(userId, message) {
//     console.log(`Notification sent to user ${userId}: ${message}`);
//  }