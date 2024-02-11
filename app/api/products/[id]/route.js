import { connect } from "../../../utils/mongodb";
import { NextResponse } from "next/server";
import Products from "../../models/Product";

export async function PUT(request, { params }) {
  try {
    await connect();
    const existingProduct = await Products.findById(params.id);
    if (!existingProduct) {
      return new Response("Product not found", { status: 404 });
    }
    const { name, description, price, category, imageUrl } =
      await request.json();
    if (!name && !description && !price && !category && !imageUrl) {
      return new Response("At least one field is needed to update", {
        status: 400,
      });
    }

    if (name) existingProduct.name = name;
    if (description) existingProduct.description = description;
    if (price) existingProduct.price = parseInt(price);
    if (category) existingProduct.category = category;
    if (imageUrl) existingProduct.imageUrl = imageUrl;

    await existingProduct.save();

    return new Response("Successfully updated the product", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(Request, { params }) {
  try {
    await connect();

    const deleteProduct = await Products.findByIdAndDelete({
      _id: params.id,
    });

    if (deleteProduct) {
      return Response.json({ message: "Product Deleted" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(Request,params) {
  try {
    await connect();
    const product = await Products.findById(params.id).populate("sellerId");

    if (product) {
      return Response.json(
        { meesage: "Product Found", product },
        { status: 200 }
      );
    } else {
      Response.json({ message: "Product Not Found" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error:", error);
    Response.json({ error: "Internal Server Error" });
  }
}
// export async function GET({ params }) {
//   try {
//     await connect();
//     const product = await Product.findById(params.id).populate("sellerId");

//     if (product) {
//       return Response.json(
//         { meesage: "Product Found", product },
//         { status: 200 }
//       );
//     } else {
//       Response.json({ message: "Product Not Found" }, { status: 400 });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     Response.json({ error: "Internal Server Error" });
//   }
// }
