import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        price: Number,
        quantity: Number
      }
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered'],
      default: 'Pending'
    },
    address: {
      fullName: String,
      line1: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      phone: String
    },
    paymentMethod: { type: String, enum: ['COD', 'ONLINE'], default: 'COD' }
  },
  { timestamps: true }
);

export const Order = models.Order || model('Order', OrderSchema);
