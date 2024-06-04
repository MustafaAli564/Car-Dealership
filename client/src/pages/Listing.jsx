import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaCar,
    FaComment,
    FaMapMarkerAlt,
    FaRegCopy,
    } from 'react-icons/fa';
  import { IoIosColorFill, IoIosSpeedometer } from "react-icons/io";
  import { SiFueler } from "react-icons/si";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { BsFillFuelPumpFill } from "react-icons/bs";
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const {currentUser} = useSelector((state) => state.user)
    const [contact, setContact] = useState();
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const params = useParams();
    useEffect(() => {
        const fetchListing = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if (data.success === false) {
              setError(true);
              setLoading(false);
              return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchListing();
      }, [params.listingId]);
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something's Wrong</p>}
        {listing && !loading && !error && (
            <div>
                <Swiper navigation>
                    {listing.Listing_info.Photos.map((url) => (  
                        <SwiperSlide key={url}>
                            <div className='h-[500px]' style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: 'small'
                                }}>
                                
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                    <FaRegCopy
                      className='text-slate-500 hover:text-black'
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 2000);
                      }}
                    />
                
                </div>
                {copied && toast.success('Link Copied!!')}
                <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 border border-black rounded-lg'>
                    <p className='text-2xl font-semibold'>{listing.Listing_info.Title} - ${listing.Listing_info.Price}</p>
                    <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                        <FaMapMarkerAlt className='text-black'/>
                        {listing.Listing_info.Location}
                    </p>
                    <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                        <FaCar className='text-black'/>
                        {listing.Car_info.Make}, {listing.Car_info.Model} - {listing.Car_info.Year}
                    </p>
                    <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                        <FaComment className='text-black'/>
                        {listing.Listing_info.Description}
                    </p>
                    <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <IoIosColorFill className='text-black'/>
                            {listing.Car_info.Color}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <IoIosSpeedometer className='text-black'/>
                            {listing.Car_info.Mileage}Km
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <SiFueler className='text-black'/>
                            {listing.Car_info.Transmission}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <BsFillFuelPumpFill className='text-black'/>
                            {listing.Car_info.Fuel_type}
                        </li>
                    </ul>
                    {currentUser && listing.user !== currentUser.rest._id && !contact && (
                      <button
                        onClick={() => setContact(true)}
                        className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
                      >
                        Contact Owner
                      </button>
                    )}
                    {contact && <Contact listing={listing}/>}
                </div>
            </div>
        )}
    </main>
  )
}
