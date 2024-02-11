// pages/seller-profiles.js
"use client";
import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Nav from "../component/Nav";
const SellerProfilesPage = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      const response = await fetch("/api/sellerProfile");
      const data = await response.json();

      setSellers(data.sellers);

      console.log(data);
    };

    fetchSellers();
  }, []);

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Seller Profiles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <div key={seller._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{seller.storeName}</h2>
              <p className="text-gray-600">{seller.description}</p>
              <ul className="mt-4">
                <li>
                  <strong>Email:</strong> {seller.email}
                </li>
                <li>
                  <strong>Phone:</strong> {seller.phone}
                </li>
                <li>
                  <strong>Location:</strong> {seller.city}, {seller.country}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerProfilesPage;
