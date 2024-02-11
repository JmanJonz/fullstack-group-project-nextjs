"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-bold">Artifact Haven</p>
          <p className="text-sm">
            Your premier destination for discovering and acquiring exquisite
            artifacts from around the world!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <div>
            <p className="text-lg font-bold">Explore</p>
            <ul className="text-sm">
              <li>
                <a href="/products" className="hover:text-gray-400">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold">Legal</p>
            <ul className="text-sm">
              <li>
                <a href="/privacy-policy" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold">Connect With Us</p>
            <ul className="text-sm">
              <li>Email: info@artifacthaven.com</li>
              <li>Phone: +1 123-456-7890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
