import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { toast } from 'react-toastify';

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [uploadError, setUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        imageURLs: [],
    });

    console.log(formData);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageURLs.length < 5) {
            setUploading(true);
            setUploadError(false);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageURLs: formData.imageURLs.concat(urls)
                });
                setUploadError(false);
                setUploading(false);
                toast.success('Uploaded!');
            }).catch((err) => {
                setUploadError('Image Upload Failed');
                setUploading(false);
                toast.error(uploadError);
            });
        } else {
            setUploadError('Upload 1-4 Images!');
            setUploading(false);
            toast.error(uploadError);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (ind) => {
        setFormData({
            ...formData,
            imageURLs: formData.imageURLs.filter((_, i) => i !== ind),
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }

    const handleSubmit = (e) => {

    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input onChange={handleChange} type="text" placeholder='Title' id='Title' className='border p-3 rounded-lg' maxLength='50' minLength='3' required />
                    <textarea onChange={handleChange} type="text" placeholder='Description' id='Description' className='border p-3 rounded-lg' required />
                    <input onChange={handleChange} type="number" placeholder='Price' id='Price' className='border p-3 rounded-lg' maxLength='10' minLength='1' required />
                    <select onChange={handleChange} id="Location" name="Location" className="border p-3 rounded-lg" defaultValue="" required>
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
                        <input onChange={(e) => setFiles(e.target.files)} className='p-2 border border-gray-300 rounded w-auto' type="file" accept='image/*' id="images" multiple />
                        <button type='button' onClick={handleImageSubmit} className='border border-green-700 text-green-700 hover:shadow-lg uppercase rounded p-2 disabled:opacity-80'>{uploading ? 'Uploading...':'Upload'}</button>
                    </div>
                    {
                        formData.imageURLs.length > 0 && formData.imageURLs.map((url, index) => (
                            <div key={url} className='flex justify-between p-3 border items-center'>
                                <img src={url} alt="Listing Image" className='w-20 h-20 object-contain rounded-lg' />
                                <button onClick={() => handleRemoveImage(index)} type='button' className='p-1 bg-red-600 text-white border border-black hover:opacity-90 rounded-lg'>Delete</button>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col flex-1 gap-4'>

                    <div className='flex gap-2'>
                        <select onChange={handleChange} id="Make" name="Make" className="border p-3 rounded-lg w-1/3" defaultValue="" required >
                            <option value="" disabled hidden>Select Make</option>
                            <option value="Honda">Honda</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Mercedes">Mercedes</option>
                            <option value="BMW">BMW</option>
                            <option value="KIA">KIA</option>
                            {/* <!-- Add more options as needed --> */}
                        </select>
                        <input onChange={handleChange} type="text" placeholder='Model' id='Model' className='border p-3 rounded-lg w-1/3' maxLength='30' minLength='1' required />
                        <input onChange={handleChange} type="number" placeholder='Year' id='Year' className='border p-3 rounded-lg w-1/3' maxLength='4' minLength='4' required />
                    </div>

                    <input onChange={handleChange} type="text" placeholder='Color' id='Color' className='border p-3 rounded-lg' required />
                    <input onChange={handleChange} type="number" placeholder='Engine Size' id='Engine_Size' className='border p-3 rounded-lg' required />

                    <div className='flex gap-2'>
                        <input onChange={handleChange} type="number" placeholder='Mileage' id='Mileage' className='border p-3 rounded-lg w-1/3' required />
                        <select onChange={handleChange} id="Transmission" name="Transmission" className="border p-3 rounded-lg w-1/3" defaultValue="" required>
                            <option value="" disabled hidden>Transmission Type</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="CVT">CVT</option>
                            <option value="Semi-Automatic">Semi-Automatic</option>
                            {/* <!-- Add more options as needed --> */}
                        </select>
                        <select onChange={handleChange} id="FuelType" name="FuelType" className="border p-3 rounded-lg w-1/3" defaultValue="" required>
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
    );
}
