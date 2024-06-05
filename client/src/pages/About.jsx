import React from 'react'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-6">
        Welcome to our car dealership! We are passionate about providing our customers with high-quality vehicles and exceptional service. Our team is dedicated to helping you find the perfect car that fits your needs and budget.
      </p>
      <p className="text-lg mb-6">
        With years of experience in the automotive industry, we pride ourselves on our extensive knowledge and expertise. Whether you're looking for a new or used car, our friendly and professional staff are here to assist you every step of the way.
      </p>
      <p className="text-lg mb-6">
        At our dealership, customer satisfaction is our top priority. We strive to make your car buying experience as seamless and enjoyable as possible. From test drives to financing options, we'll work hard to ensure that you drive away happy in the car of your dreams.
      </p>
      <p className="text-lg mb-6">
        Thank you for considering us for your next vehicle purchase. We look forward to serving you and helping you find the perfect car that suits your lifestyle.
      </p>
      <div className="text-center">
        <img src="../../public/assets/about.jpg" alt="About Us" className="rounded-lg shadow-lg mx-auto mb-4" style={{ maxWidth: '600px' }} />
      </div>
    </div>
  );
}
