/** @type {import('next').NextConfig} */

export default {
  images: {
    domains: ["lh3.googleusercontent.com", "i.pinimg.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
