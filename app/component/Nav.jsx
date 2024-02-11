"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from "../../public/logo-justbird.png";
import Link from "next/link";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-900 text-white">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image src={Logo} alt="Haven Logo" width={40} height={40} />
        </Link>
        <ul className="hidden md:flex flex-row space-x-6">
          <li>
            <Link href="/Products">Products</Link>
          </li>
          <li>
            <Link href="/seller-Profiles">Available Sellers</Link>
          </li>
          <li>
            <Link href="/About">About Us</Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {session?.user ? (
          <div className="flex items-center space-x-4">
            <Link
              className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              href="/AddProduct"
            >
              Add Product
            </Link>

            <button
              className="btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              onClick={signOut}
            >
              Sign Out
            </button>
            <Link href="/Profile" className="flex items-center">
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden relative">
        {session?.user ? (
          <div className="flex">
            <button
              onClick={() => setToggleDropdown(!toggleDropdown)}
              className="focus:outline-none"
            >
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="profile"
              />
            </button>
            {toggleDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg">
                <Link
                  href="/Profile"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/AddProduct"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setToggleDropdown(false)}
                >
                  Add Product
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 focus:outline-none"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
