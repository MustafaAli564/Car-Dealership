import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Report({listing}) {
    const [owner, setOwner] = useState(null);
    const [rep, setRep] = useState('');
    const [req, setReq] = useState({
        listingId: listing._id,
        report: ''
    })

    const handleChange = (e) => {
        setReq({
            ...req,
            report: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        setReq
        e.preventDefault();
        try {
            const res = await fetch('/api/interaction/report', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            })
            const data = await res.json();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <textarea name='rep' id='report' rows='2' onChange={handleChange} placeholder='Enter Your Report Reason Here' className='w-full border p-3 rounded-lg'>
        </textarea>
        <button className='bg-red-500 border-black rounded-lg p-1 text-white font-semibold hover:opacity-90'>Submit</button>
    </form>
  )
}
