import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [owner, setOwner] = useState(null);
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const res = await fetch(`/api/user/${listing.user}`);
                const data = await res.json();
                setOwner(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOwner();
    }, [listing.user])
  return (
    <>
        {owner && (
            <div className='flex flex-col gap-2'>
                <p>Contact <span className='font-semibold'>{owner.username}</span></p>
                <textarea name='msg' id='msg' rows='2' value={msg} onChange={handleChange} placeholder='Enter Your Message Here' className='w-full border p-3 rounded-lg'>
                </textarea>
                <Link 
                    to={`mailto:${owner.email}?subject=Regarding ${listing.Listing_info.Title}&body=${msg}`}
                    className='bg-slate-700 text-white text-center uppercase rounded-lg hover:opacity-90'>
                        Send Message
                    </Link>
            </div>
        )}
    </>
  )
}
