import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);

  return (
    <header className='bg-zinc-700 shadow-lg flex items-center px-4 py-6'>
        <div className="flex items-center">
            <Link to={'/'}>
                <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                    <span className='text-red-500'>Car</span>
                    <span className='text-white'>Dealership</span>
                </h1>
            </Link>
        </div>
        <form onSubmit={handleSubmit} className="ml-auto bg-zinc-700 flex items-center">
            <button>
                <FaSearch className='text-white m-2 size-5 hover:text-blue-400'/>
            </button>
            <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="text" placeholder='Search..' className=" w-24 sm:w-64 px-3 py-1 border rounded focus:outline-none text-black"/>
        </form>
        <ul className='text-white flex gap-5 ml-auto '>
            <Link to={'/'}>
                <li className='p-1 font-medium hover:underline'>Home</li>
            </Link>
            <Link to={'/about'}>
                <li className='p-1 font-medium hover:underline'>About</li>
            </Link>
            <Link to={currentUser === null || !currentUser.rest || !currentUser.rest.avatar ? '/sign-in' : '/profile'}>
    {           currentUser === null || !currentUser.rest || !currentUser.rest.avatar ? (
                    <li className='bg-green-700 shadow-lg rounded p-1 hover:bg-green-950'>Signin/Signup</li>
                ) : (
                    <img className='rounded-full max-h-9 max-w-9' src={currentUser.rest.avatar} alt='profile' />
                )}
            </Link>
        </ul>
    </header>
  )
}
