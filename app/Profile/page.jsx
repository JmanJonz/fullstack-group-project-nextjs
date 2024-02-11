"use client";
import { useSession } from "next-auth/react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Nav />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
          <p className="text-lg font-semibold mb-4">
            Welcome, {session?.user ? session.user.name : "Guest"}!
          </p>
          {!session?.seller ? (
            <Link
              className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 "
              href="/create-seller"
            >
              Become Seller
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
