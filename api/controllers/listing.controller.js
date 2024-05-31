import Listing from '../models/listing.model.js';



export const createListing = async (req, res, next) => {
  try {
    const user = req.user;

    const { Listing_info, Car_info } = req.body; 
    const listing = await Listing.create({
      Listing_info,
      Car_info,
      user: user._id 
    });

    return res.status(201).json(listing); 
  } catch (error) {
    next(error); 
  }
};

 
export const deleteListing = async (req, res) => {

    try {
      const { id } = req.params;
  
      const deletedListing = await Listing.findByIdAndDelete(id);
  
      if (!deletedListing) {
        return res.status(404).json({ message: 'Listing not found' });
      }

      return res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {

        return res.status(500).json({ message: 'Internal server error', error });
    }
  };


export const updateListing = async (req, res) => {
    try {
      const { id } = req.params;
      const { Listing_info, Car_info } = req.body;
  
      const updatedListing = await Listing.findByIdAndUpdate(id, { Listing_info, Car_info }, { new: true });
  
      if (!updatedListing) {
        return res.status(404).json({ message: 'Listing not found' });
      }
  
      return res.status(200).json({ message: 'Listing updated successfully', listing: updatedListing });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };

  export const getUserListings = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const userListings = await Listing.find({ user: userId });
  
      return res.status(200).json({ listings: userListings });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };
  

  export const getListingDetails = async (req, res) => {
    
    try {
      const { id } = req.params;
  
      const listing = await Listing.findById(id);
  
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }
  
      return res.status(200).json({ listing });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };

  export const searchListings = async (req, res) => {

    try {
      const { city, state, make, model, year } = req.query;

      const query = {};
      if (city) query['Listing_info.Location.city'] = city;
      if (state) query['Listing_info.Location.state'] = state;
      if (make) query['Car_info.Make'] = make;
      if (model) query['Car_info.Model'] = model;
      if (year) query['Car_info.Year'] = year;
  
      const matchingListings = await Listing.find(query);
  
      return res.status(200).json({ listings: matchingListings });

    } catch (error) {

        return res.status(500).json({ message: 'Internal server error', error });
    
    }
  };

  