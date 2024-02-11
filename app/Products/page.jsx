"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import Link from "next/link";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false); // State to track if component is on client-side

  useEffect(() => {
    setIsClient(true); // Set isClient to true when component mounts on client-side

    const fetchProduct = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();

      setProducts(data.products || []);
    };
    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      const del = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (del.ok) {
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
      } else {
        console.error("Delete request failed");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const searchRegex = new RegExp(searchQuery, "i");
    return (
      searchRegex.test(product.name) ||
      searchRegex.test(product.category) ||
      searchRegex.test(product.price.toString())
    );
  });

  if (!isClient) return null; // Return null if component is not on client-side

  return (
    <>
      <Nav />
      <div className="container mx-auto py-12 px-4">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products..."
          className="border rounded-md px-4 py-2 mb-4"
        />
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No products in the database.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/product-detail?id=${product._id}`}
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-700 mb-2">{product.price}</p>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-gray-700 mb-2">{product.category}</p>

                    <Link
                      href={`update-product?id=${product._id}`}
                      className="bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-900 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 ml-3"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
