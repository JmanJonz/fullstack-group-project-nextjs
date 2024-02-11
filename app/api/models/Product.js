import { Schema, model, models } from "mongoose";
const productSchema = new Schema({
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "SellerProfile",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Products = models.Product || model("Product", productSchema);

export default Products;
