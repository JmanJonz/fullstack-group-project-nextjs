"use client";
import { useState, useEffect } from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";

import { useRouter, useSearchParams } from "next/navigation";

const AddProductForm = () => {
  const router = useRouter();

const searchParams = useSearchParams();
  const prodId = searchParams.get("id");
  const [prod, setProd] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  useEffect(() => {
    const getProdDetail = async () => {
      const response = await fetch(`/api/products/${prodId}`);
      const data = await response.json();
      setProd({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl,
      });

      console.log(data, "=====================================update===>");

      if (prodId) {
        getProdDetail;
      }
    };
  }, [prodId]);
  const [formData, setFormData] = useState({
    name: prod.name,
    description: prod.description,
    price: prod.price,
    category: prod.category,
    imageUrl: prod.imageUrl,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!prodId) {
        return alert("Missing Product Id");
      }
      const response = await fetch(`/api/products/${prodId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/Products");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Update Product</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-800"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-lg font-medium text-gray-800"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-800"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-lg font-medium text-gray-800"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Save
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddProductForm;
