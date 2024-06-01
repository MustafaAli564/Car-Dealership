import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [formData, setFormData] = useState({})
  const {loading, error, currentUser} = useSelector((state) => state.user); 
  const fileRef = useRef(null);
  const dispatch = useDispatch();

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

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>
            Profile
        </h1>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          {currentUser && currentUser.rest && currentUser.rest.avatar ? (
            <img src={currentUser.rest.avatar} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
          ) : (
            <div className='rounded-full h-24 w-24 bg-gray-300 self-center mt-2'></div>
          )}
          <input type="text" placeholder='username' defaultValue={currentUser.rest.username} className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
          <input type="email" placeholder='email' defaultValue={currentUser.rest.email} className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
          <input type="tel" placeholder='Phone' defaultValue={currentUser.rest.PhoneNumber} className='border p-3 rounded-lg' id='PhoneNumber' onChange={handleChange}/>
          <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>{loading? 'Loading...' : 'Update'}</button>
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
    </div>
  )
}
