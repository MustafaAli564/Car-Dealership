import React from 'react';
import car1 from '../../public/assets/car_1.jpg';
import car2 from '../../public/assets/car_2.jpg';
import car3 from '../../public/assets/car_3.jpg';
import car4 from '../../public/assets/car_4.jpg';
import car5 from '../../public/assets/car_5.jpg';
import car6 from '../../public/assets/car_6.jpg';
import {useNavigate} from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/search');
  };

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 my-20 font-montserrat">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="image-card text-center p-4 col-span-1 md:col-span-2">
              <img
                  src={car1}
                  alt="Car 1"
                  className="rounded-lg h-full w-full object-cover mx-auto"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-rows-2 grid-flow-col gap-4">
              <div className="image-card text-center p-4">
                <img
                    src={car2}
                    alt="Car 2"
                    className="rounded-lg h-full w-full object-cover mx-auto"
                />
              </div>
              <div className="image-card text-center p-4">
                <img
                    src={car3}
                    alt="Car 3"
                    className="rounded-lg h-full w-full object-cover mx-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="image-card text-center p-4">
              <img
                  src={car4}
                  alt="Car 4"
                  className="rounded-lg h-full w-full object-cover mx-auto"
              />
            </div>
            <div className="image-card text-center p-4">
              <img
                  src={car5}
                  alt="Car 5"
                  className="rounded-lg h-full w-full object-cover mx-auto"
              />
            </div>
            <div className="image-card text-center p-4">
              <img
                  src={car6}
                  alt="Car 6"
                  className="rounded-lg h-full w-full object-cover mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto flex flex-col items-center justify-center p-4">
          <h2 className="text-3xl font-bold mb-4">GET THE BEST DEALS</h2>
          <p className="text-center text-lg mb-4 px-20 py-5">
            Discover amazing deals on the latest cars. We offer a wide range of vehicles to suit your needs and budget.
            Whether you're looking for a sleek sports car or a reliable family vehicle, we have something for everyone.
            Don't miss out on these exclusive offers!
          </p>
          <button className="bg-red-500 text-white py-2 px-10 rounded hover:bg-red-950" onClick={handleButtonClick}>
            See Listings
          </button>
        </div>
      </div>
  );
}
