import SellerProfile from "../../models/Seller";
import { connect } from "../../../utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connect();
  const {
    sellerName,
    email,
    phone,
    country,
    city,
    address,
    storeName,
    description,
    averageRating,
    totalRatings,
  } = await request.json();
  try {
    const newSeller = new SellerProfile({
      sellerName,
      email,
      phone,
      country,
      city,
      address,
      storeName,
      description,
      averageRating,
      totalRatings,
    });
    await newSeller.save();
    if (newSeller) {
      return NextResponse.json(
        { message: "Seller Created", newSeller },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
