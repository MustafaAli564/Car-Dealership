import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>  
        <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4    '>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Title' id='Title' className='border p-3 rounded-lg' maxLength='50' minLength='3' required/>
                <textarea type="text" placeholder='Description' id='Description' className='border p-3 rounded-lg' required/>
                <input type="number" placeholder='Price' id='Price' className='border p-3 rounded-lg' maxLength='10' minLength='1' required/>
                <select id="Location" name="Location" className="border p-3 rounded-lg" defaultValue="" required>
                    <option value="" disabled hidden>Select a city</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Houston">Houston</option>
                    <option value="Miami">Miami</option>
                    {/* <!-- Add more options as needed --> */}
                </select>
                <p className='font-semibold'>Images: 
                    <span className='font-normal text-gray-600 ml-2'>Upload Images</span>
                </p>
                <div className='flex gap-5'>
                    <input className='p-2 border border-gray-300 rounded w-auto' type="file" accept='image/*' id="images" multiple/>
                    <button className='border border-green-700 text-green-700 hover:shadow-lg uppercase rounded p-2 disabled:opacity-80'>Upload</button>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>

                <div className='flex gap-2'>
                    <select id="Make" name="Make" className="border p-3 rounded-lg w-1/3" defaultValue="" required >
                        <option value="" disabled hidden>Select Make</option>
                        <option value="Honda">Honda</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="BMW">BMW</option>
                        <option value="KIA">KIA</option>
                        {/* <!-- Add more options as needed --> */}
                    </select>
                    <input type="text" placeholder='Model' id='Model' className='border p-3 rounded-lg w-1/3' maxLength='30' minLength='1' required/>
                    <input type="number" placeholder='Year' id='Year' className='border p-3 rounded-lg w-1/3' maxLength='4' minLength='4' required/>
                </div>

                <input type="text" placeholder='Color' id='Color' className='border p-3 rounded-lg' required/>
                <input type="number" placeholder='Engine Size' id='Engine_Size' className='border p-3 rounded-lg' required/>

                <div className='flex gap-2'>
                    <input type="number" placeholder='Mileage' id='Mileage' className='border p-3 rounded-lg w-1/3' required/>  
                    <select id="Transmission" name="Transmission" className="border p-3 rounded-lg w-1/3" defaultValue="" required>
                        <option value="" disabled hidden>Transmission Type</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                        <option value="Semi-Automatic">Semi-Automatic</option>
                        {/* <!-- Add more options as needed --> */}
                    </select>
                    <select id="FuelType" name="FuelType" className="border p-3 rounded-lg w-1/3" defaultValue="" required>
                        <option value="" disabled hidden>Fuel Type</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Ethanol">Ethanol</option>
                        <option value="Biodiesel">Biodiesel</option>
                        {/* <!-- Add more options as needed --> */}
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 my-2'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}
