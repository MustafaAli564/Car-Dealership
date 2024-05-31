import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const{currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>
            Profile
        </h1>
        <form className='flex flex-col'>
          <img src={currentUser.rest.avatar} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
          <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
          <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email'/>
          <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password'/>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>update</button>
        </form>
        <div className='flex justify-between mt-5'>
          <span className='bg-red-700 shadow-lg rounded p-1 hover:bg-red-950 text-white border border-black'>
            Delete Account
          </span>
          <span className='text-red-700 cursor-pointer hover:underline'>
            Sign out 
          </span>
        </div>
    </div>
  )
}
