import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';


export const createListing = async (req, res, next) => {
  try {
    const { Listing_info, Car_info, user } = req.body; 
    const listing = await Listing.create({
      Listing_info,
      Car_info,
      user: user
    });

    return res.status(201).json({listing, message:"Listing Created!"}); 
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

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let location = req.query.location;
    if (!location || location === 'all') {
      location = { $in: ['Miami', 'Houston', 'Chicago', 'Los Angeles', 'New York'] };
    }

    let make = req.query.make;
    if (!make || make === 'all') {
      make = { $in: ['Honda', 'Toyota', 'Mercedes', 'BMW', 'KIA'] };
    }

    let transmission = req.query.transmission;
    if (!transmission || transmission === 'all') {
      transmission = {$in: ['Semi-Automatic','CVT','Manual','Automatic']};
    }

    let fuel = req.query.fuel_type;
    if(!fuel || fuel === 'all'){
      fuel = { $in: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Ethanol', 'Biodiesel'] }
    }

    // const minMileage = parseInt(req.query.minMileage) || 0;
    let minMileage = parseInt(req.query.minMileage)
    if(!minMileage){
      minMileage = 0;
    }
    // const maxMileage = parseInt(req.query.maxMileage) || Number.MAX_SAFE_INTEGER;
    let maxMileage = parseInt(req.query.maxMileage)
    if(!maxMileage){
      maxMileage = Number.MAX_SAFE_INTEGER;
    }

    // const minPrice = parseInt(req.query.minPrice) || 0;
    let minPrice = parseInt(req.query.minPrice)
    if(!minPrice){
      minPrice = 0;
    }
    // const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
    let maxPrice = parseInt(req.query.maxPrice)
    if(!maxPrice){
      maxPrice = Number.MAX_SAFE_INTEGER;
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      'Listing_info.Title': { $regex: searchTerm, $options: 'i' },
      'Listing_info.Location': location,
      'Car_info.Make': make,
      'Car_info.Transmission': transmission,
      'Car_info.Fuel_type': fuel,
      'Car_info.Mileage': { $gte: minMileage, $lte: maxMileage },
      'Listing_info.Price': { $gte: minPrice, $lte: maxPrice },
    }).sort(
      { [sort]: order }
    ).limit(limit).skip(startIndex);

    return res.status(200).json(listings);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


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
      const { location, make, model, year } = req.query;

      const query = {};
      // if (city) query['Listing_info.Location.city'] = city;
      // if (state) query['Listing_info.Location.state'] = state;
      if(location) query['Listing_info.Location'] = location
      if (make) query['Car_info.Make'] = make;
      if (model) query['Car_info.Model'] = model;
      if (year) query['Car_info.Year'] = year;
  
      const matchingListings = await Listing.find(query);
  
      return res.status(200).json({ listings: matchingListings });

    } catch (error) {

        return res.status(500).json({ message: 'Internal server error', error });
    
    }
  };

  