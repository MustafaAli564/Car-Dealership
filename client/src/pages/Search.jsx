import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const [queryData, setQueryData] = useState({
        searchTerm: '',
        location: '',
        make: '',
        transmission: '',
        minMileage: '',
        maxMileage: '',
        minPrice: '',
        maxPrice: '',
        fuel: '',
        sort: 'createdAt',
        order: 'desc',
    });
    console.log(queryData);

    const handleChange = (e) => {
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';  
            setQueryData({
                ...queryData,
                sort,
                order,
            })
        }else{
            setQueryData({
                ...queryData,
                [e.target.id]: e.target.value,
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', queryData.searchTerm)
        urlParams.set('location', queryData.location)
        urlParams.set('make', queryData.make)
        urlParams.set('transmission', queryData.transmission)
        urlParams.set('minMileage', queryData.minMileage)
        urlParams.set('maxMileage', queryData.maxMileage)
        urlParams.set('minPrice', queryData.minPrice)
        urlParams.set('maxPrice', queryData.maxPrice)
        urlParams.set('fuel', queryData.fuel)
        urlParams.set('sort', queryData.sort)
        urlParams.set('order', queryData.order)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
        
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const urlSearchTerm = urlParams.get('searchTerm');
        const urlLocation= urlParams.get('location');
        const urlMake = urlParams.get('make');
        const urltransmission = urlParams.get('transmission');
        const urlMinMileage = urlParams.get('minMileage');
        const urlMaxMileage = urlParams.get('maxMileage');
        const urlMinPrice = urlParams.get('minPrice');
        const urlMaxPrice = urlParams.get('maxPrice');
        const urlFuel = urlParams.get('fuel');
        const urlSort = urlParams.get('sort');
        const urlOrder = urlParams.get('order');

        if(
            urlSearchTerm ||
            urlLocation ||
            urlMake ||
            urltransmission ||
            urlMinMileage ||
            urlMaxMileage ||
            urlMinPrice ||
            urlMaxPrice ||
            urlFuel ||
            urlSort ||
            urlOrder
        ){
            setQueryData({
                searchTerm: urlSearchTerm || '',
                location: urlLocation || '',
                make: urlMake || '',
                transmission: urltransmission || '',
                minMileage: urlMinMileage || '',
                maxMileage: urlMaxMileage || '',
                minPrice: urlMinPrice || '',
                maxPrice: urlMaxPrice || '',
                fuel: urlFuel || '',
                sort: urlSort || 'createdAt',
                order: urlOrder || 'desc',
            })
        }
    }, [location.search]);

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen w-2/5'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>
                      Search Term:
                    </label>
                    <input
                      type='text'
                      id='searchTerm'
                      placeholder='Search...'
                      className='border rounded-lg p-3 w-full'
                      value={queryData.searchTerm}
                      onChange={handleChange}
                    />
                </div>
                <div className='flex gap-2'>
                    <select onChange={handleChange} id="location" name="location" className="border p-3 rounded-lg w-1/5 text-xs" defaultValue={queryData.location} >
                        <option value="" disabled hidden>City</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Houston">Houston</option>
                        <option value="Miami">Miami</option>
                        {/* <!-- Add more options as needed --> */}
                    </select>
                    <select onChange={handleChange} id="make" name="make" className="border p-3 rounded-lg w-1/5 text-xs" defaultValue={queryData.make}  >
                        <option value="" disabled hidden>Make</option>
                        <option value="Honda">Honda</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="BMW">BMW</option>
                        <option value="KIA">KIA</option>
                        {/* <!-- Add more options as needed --> */}
                    </select>
                    <select onChange={handleChange} id="transmission" name="transmission" className="border p-3 rounded-lg w-1.5/5 text-xs" defaultValue={queryData.transmission} >
                        <option value="" disabled hidden>Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                        <option value="Semi-Automatic">Semi-Automatic</option>
                        {/* <!-- Add more options as needed --> */}
                    </select>
                    <select onChange={handleChange} id="fuel" name="fuel" className="border p-3 rounded-lg w-1.5/5 text-xs" defaultValue={queryData.fuel} >
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
                <div className='flex items-center gap-1'>
                    <label className='font-semibold w-2/4'>Price Range: </label>
                    <input onChange={handleChange} value={queryData.minPrice} min='0' type="number" name="minPrice" id="minPrice" placeholder='Min' className="w-1/4 rounded-lg border"/>
                    <input onChange={handleChange} value={queryData.maxPrice} min='0' type="number" name="maxPrice" id="maxPrice" placeholder='Max' className="w-1/4 rounded-lg border"/>
                </div>
                <div className='flex items-center gap-1'>
                    <label className='font-semibold w-2/4'>Mileage Range: </label>
                    <input onChange={handleChange} value={queryData.minMileage} min='0' type="number" name="minMileage" id="minMileage" placeholder='Min' className="w-1/4 rounded-lg border"/>
                    <input onChange={handleChange} value={queryData.maxMileage} min='0' type="number" name="maxMileage" id="maxMileage" placeholder='Max' className="w-1/4 rounded-lg border"/>
                </div>
                <div className='p-1 flex items-center gap-1'>
                    <label className='font-semibold w-2/4'>Sort: </label>
                    <select onChange={handleChange} className="rounded-lg border w-2/4"name="sort_order" defaultValue={'createdAt_desc'} id="sort_order">
                        <option value='Price_desc'>Price high to low</option>
                        <option value='Price_asc'>Price low to hight</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='bg-zinc-700 rounded-lg text-white p-2 hover:opacity-90 uppercase'>Search</button>
            </form>
        </div>
        <div>
            <h1 className='text-3xl font-semibold underline text-zinc-700'>Results:</h1>
        </div>
    </div>
  )
}
