import Product from "../models/Product";
import { connect } from "../../utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  try {
    const products = await Product.find().populate("sellerId");

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No Products Available" },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ products }, { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
