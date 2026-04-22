import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Product = models.Product || model('Product', ProductSchema);
