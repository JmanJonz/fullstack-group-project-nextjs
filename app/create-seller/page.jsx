"use client";
import { useState } from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreateSellerForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    sellerName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    storeName: "",
    description: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sellerProfile/createSeller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sellerName: formData.sellerName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          address: formData.address,
          storeName: formData.storeName,
          description: formData.description,
        }),
      });

      if (response.ok) {
        router.push("/Profile");
      }
    } catch (error) {
      console.error("Error creating seller profile:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Seller Profile
        </h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="sellerName"
              className="block text-lg font-medium text-gray-800"
            >
              Seller Name
            </label>
            <input
              type="text"
              id="sellerName"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
            <label
              htmlFor="sellerName"
              className="block text-lg font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
            <label
              htmlFor="sellerName"
              className="block text-lg font-medium text-gray-800"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
            <label
              htmlFor="sellerName"
              className="block text-lg font-medium text-gray-800"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
            <label
              htmlFor="sellerName"
              className="block text-lg font-medium text-gray-800"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
            <label
              htmlFor="sellerName"
              className="block text-lg font-medium text-gray-800"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
            <label
              htmlFor="sellerName"
              className="block text-lg font-medium text-gray-800"
            >
              Store Name
            </label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Create Seller Profile
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateSellerForm;
