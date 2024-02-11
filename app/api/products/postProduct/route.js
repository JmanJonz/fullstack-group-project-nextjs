import { connect } from "../../../utils/mongodb";
import Products from "../../models/Product";

export async function POST(request) {
  await connect();
  try {
    const { name, description, price, category, imageUrl, sellerId } =
      await request.json();

    const postProduct = new Products({
      sellerId: sellerId,
      name,
      description,
      price,
      category,
      imageUrl,
    });
    await postProduct.save();
    return new Response(JSON.stringify(postProduct), { status: 201 });
  } catch (error) {
    // Handle error
    console.error("Error adding product:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
