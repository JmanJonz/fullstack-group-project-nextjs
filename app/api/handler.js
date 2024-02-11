// Import necessary dependencies and configurations
import { NextResponse, NextRequest } from "next/server";

export default async function handler() {
  try {
    if (req.method === "POST") {
      // Handle POST request
      const data = req.body;
      NextResponse.status(200).json({ message: "POST request handled", data });
    } else {
      // Handle other HTTP methods
      NextResponse.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    NextResponse.status(500).json({ message: "Internal Server Error" });
  }
}
