import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';

export default function Profile() {
  const [formData, setFormData] = useState({})
  const {loading, error, currentUser} = useSelector((state) => state.user); 
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const[file, setFile] = useState(undefined);
  const[userListings, setUserListings] = useState();
  const[showListingsError, setShowListingsError] = useState(false);
  const[perc, setPerc] = useState(0);
  const[uploadError, setUploadError] = useState(false);
  // console.log(formData);
  // console.log(perc);
  // console.log(uploadError);
  console.log(userListings);
  const handleShowListings = async (e) => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser.rest._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(Math.round(progress));
      },
    
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => {
          setFormData({
            ...formData,
            avatar: downloadURL
          });
        })
      },
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.rest || !currentUser.rest._id) {
      toast.error("User data is not available.");
      return;
    }
    const userid = currentUser.rest._id
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(updateUserSuccess(data));
      toast.success(data.message);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error.message)
    }
  }
  const handleDelete = async (e) => {
    const userid = currentUser.rest._id;
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${userid}`,{
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  }
  const handleSignOut = async (e) =>{
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message));
        toast.error(data.message);
        return
      }
      dispatch(signOutSuccess(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(signOutFailure(error.message));
      toast.error(error.message);
    }
  }
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>
            Profile
        </h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          {/* {currentUser && currentUser.rest && currentUser.rest.avatar ? (
            <img src={currentUser.rest.avatar} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
          ) : (
            <div className='rounded-full h-24 w-24 bg-gray-300 self-center mt-2'></div>
          )} */}
          <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
          <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.rest.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
          <p className='text-sm self-center'>
            {uploadError ? (
              <span className='text-red-700'>Error uploading image</span> ) :
              perc > 0 && perc < 100 ? (
                <span className='text-slate-700'>{`Uploading ${perc}%`}</span>
              ) :
              perc === 100 ? (
                <span className='text-green-700'>Image Uploaded!</span>
              ) : (
                ''
              )
            }
          </p>
          <input type="text" placeholder='username' defaultValue={currentUser.rest.username} className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
          <input type="email" placeholder='email' defaultValue={currentUser.rest.email} className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
          <input type="tel" placeholder='Phone' defaultValue={currentUser.rest.PhoneNumber} className='border p-3 rounded-lg' id='PhoneNumber' onChange={handleChange}/>
          <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 my-2'>{loading? 'Loading...' : 'Update'}</button>
          <Link className='uppercase bg-green-500 text-black p-3 rounded-lg hover:opacity-90 text-center my-2'to={'/create-listing'}>
            Create Listing
          </Link>
        </form>
        <div className='flex justify-between mt-5'>
          <Link to={'/sign-in'}>
            <span onClick={handleDelete} className='bg-red-700 shadow-lg rounded p-1 hover:bg-red-950 text-white border border-black'>
              Delete Account
            </span>
          </Link>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer hover:underline'>
            Sign out 
          </span>
        </div>
        <button onClick={handleShowListings} className='text-green-700 w-full hover:underline'>
          Show Listings
        </button>
        {userListings && userListings.length > 0 && userListings.map((listing) => (
          <div className='flex flex-row gap-4 border rounded-lg border-zinc-700 p-1 bg-white' key={listing._id}>
              <Link to={`/listing/${listing._id}`}>
                <img className="rounded-full h-16 w-16 object-contain" src={listing.Listing_info.Photos[0]} alt="No Image" />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p className='w-full text-center my-5'>{listing.Listing_info.Title}</p>
              </Link>
              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase hover:underline'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase hover:underline'>Edit</button>
                </Link>
              </div>
          </div>
        ))}
    </div>
  )
}
