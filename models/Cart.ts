import { Schema, model, models } from 'mongoose';

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

export const Cart = models.Cart || model('Cart', CartSchema);
