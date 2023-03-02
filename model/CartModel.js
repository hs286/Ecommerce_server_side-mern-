import mongoose from "mongoose";

const cartModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique : true,
    },

    product: [
      {
        _id: false,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: String},
      },
    ],
    total:{
      type:Number,
    }
  },
  { versionKey: false  }
);

var Cart = mongoose.model("Carts", cartModel);
export default Cart;
