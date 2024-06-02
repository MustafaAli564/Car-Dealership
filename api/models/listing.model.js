import mongoose from 'mongoose'


const ListingInfoSchema = new mongoose.Schema(

{
    Id:{
      type: String,
      required: true,
      unique: true  
    },

   Title: {
    type: String, 
    required : true

   },

   Description:{
    type: String, 
    required : true
   },

   Price:{
    type: Number, 
    required : true
   },

   Location: {
    type: String,
    required: true
    },

   Photos: [{
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }],

 
},{ timestamps: true }
)

const CarInfoSchema = new mongoose.Schema(
{
      Make: {
        type: String, 
        required : true
       },
    
       Model:{
        type: String, 
        required : true
       },
    
       Year: {
        type: Number, 
        required : true
    
       },

       Color:{
        type: String, 
        required : true
       },

       Engine_Size: {
        type: String, 
        required : true
       },

       Mileage: {
        type: Number, 
        required : true
       },

       Transmission: {
        type: String, 
        required : true
       },

       Fuel_type:{
        type: String, 
        required : true
       },
   
} ,{ timestamps: true }

)

const listingSchema = new mongoose.Schema({
  Listing_info: ListingInfoSchema,
  Car_info: CarInfoSchema,
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  reports: [{
    type: String
  }]
});


const Listing = mongoose.model('Listing', listingSchema);
export default Listing;