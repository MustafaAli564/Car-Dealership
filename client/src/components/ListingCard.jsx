import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swiper from 'swiper'
import { SwiperSlide } from 'swiper/react'
import {
    FaCar,
    FaComment,
    FaMapMarkerAlt,
    FaRegCopy,
    FaPhoneAlt,
    } from 'react-icons/fa';
  import { IoIosColorFill, IoIosSpeedometer } from "react-icons/io";
  import { SiFueler } from "react-icons/si";
  import { MdOutlineAttachMoney } from "react-icons/md";
import { useSelector } from 'react-redux';


export default function ListingCard({listing}) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const {currentUser} = useSelector((state) => state.user)
    console.log(user);
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const res = await fetch(`/api/user/${listing.user}`);
            const data = await res.json();
            setUser(data)
            setLoading(false);
        };
        fetchUser();
    },[listing])
  return (
    <div>
        <Link to={`/listing/${listing._id}`}>
            <div className='p-3 flex flex-col border rounded-lg border-zinc-700 bg-zinc-700 hover:scale-105 duration-300 hover:shadow-lg'>
                <img src={listing.Listing_info.Photos[0]} alt="No Image" className='p-3 border shadow-lg border-white rounded-lg h-[300px] w-[250px] object-cover  hover:opacity-100 '/>
                <div className='p-1 flex gap-1 flex-wrap'>
                    <FaCar className='my-auto text-white'/>
                    <p className='font-semibold text-white'>{listing.Listing_info.Title}</p>
                </div>
                <div className='p-1 flex gap-1 flex-wrap'>
                    <FaMapMarkerAlt className='my-auto text-white'/>
                    <p className='font-thin text-sm text-white'>{listing.Listing_info.Location}</p>
                </div>
                <div className='p-1 flex gap-1 flex-wrap'>
                    <MdOutlineAttachMoney className='my-auto text-white'/>
                    <p className='font-thin text-sm text-white'>{listing.Listing_info.Price}</p>
                </div>
                <div className='p-1 flex gap-1 flex-wrap'>
                    <IoIosSpeedometer className='my-auto text-white'/>
                    <p className='font-thin text-sm text-white'>{listing.Car_info.Mileage}</p>
                </div>
                {loading === false && user && (

                <div className='p-1 flex gap-1 flex-wrap'>
                    <FaPhoneAlt className='my-auto text-white'/>
                    <p className='font-thin text-sm text-white'>{user.PhoneNumber} - {user.username}</p>
                    <img src={user.avatar} alt="pfp" className='rounded-full max-h-5 max-w-5'/>
                </div>
                )}
                
            </div>
            
        </Link>
    </div>
  )
}
