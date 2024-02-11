import { connect } from "../../../utils/mongodb";
import { NextResponse } from "next/server";
import SellerProfile from "../../models/Seller";

export async function PUT(request, { params }) {
  try {
    await connect();
    const {
      address,
      averageRating,
      city,
      country,
      description,
      email,
      phone,
      sellerName,
      storeName,
      totalRatings,
    } = await request.json();
    if (
      address &&
      averageRating &&
      city &&
      country &&
      description &&
      email &&
      phone &&
      sellerName &&
      storeName &&
      storeName &&
      totalRatings
    ) {
      return NextResponse.json("At least a field is needed to update");
    }
    const updateSeller = await SellerProfile.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          address,
          averageRating,
          city,
          country,
          description,
          email,
          phone,
          sellerName,
          storeName,
          totalRatings,
        },
      },
      { new: true }
    );

    if (updateSeller) {
      return NextResponse.json({ message: "Product Updated" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  try {
    await connect();
    const seller = await SellerProfile.findOne({ _id: params.id });
    if (!seller) {
      return NextResponse.json(
        { message: "seller Not Found" },
        { status: 400 }
      );
    }
    const sellerProflie = await SellerProfile.findByIdAndDelete({
      _id: params.id,
    });

    if (sellerProflie) {
      return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    await connect();
    const seller = await SellerProfile.findById({ email: params.email });

    if (seller) {
      return Response.json(
        { message: "Seller Found", seller },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Product Not Found" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error:", error);

    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


