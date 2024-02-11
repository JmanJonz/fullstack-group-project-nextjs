import SellerProfile from "../models/Seller";
import { connect } from "../../utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  try {
    const sellers = await SellerProfile.find();

    if (sellers.length === 0) {
      return NextResponse.json(
        { message: "No Sellers Available" },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ sellers }, { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
