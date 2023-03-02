import Cart from "../model/CartModel.js";

export const createUserCart = async (request, response) => {
  const { id } = request.params;
  const { product } = request.body;
  try {
    const newCart = await Cart.create({
      userId: id,
      product: product,
    });
    await newCart.save();
    return response.status(200).json(newCart);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getUserProduct = async (request, response) => {
  const { id } = request.params;
  try {
    const userCart = await Cart.findOne({ userId: id }).populate(
      "product.productId"
    );
    const { _id, userId } = userCart;
    const userCartProducts = userCart?.product?.map((element) => {
      return {
        ...element.productId.toObject(),
        quantity: element.quantity,
      };
    });
    return response.status(200).json({ _id, userId, userCartProducts });
  } catch (error) {}
};

export const updateCart = async (request, response) => {
  const { id } = request.params;
  const { product } = request.body;
  try {
    product?.map(async (element) => {
      const { productId, quantity } = element;
      await Cart.updateOne(
        { userId: id, "product.productId": productId },
        { $set: { "product.$.quantity": quantity } }
      );
      await Cart.updateOne(
        { userId: id, "product.productId": { $ne: productId } },
        { $addToSet: { product: { productId: productId, quantity: quantity } } }
      );
    });
    return response.status(200).json("Updated Successfully");
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deleteCartProduct = async (request, response) => {
  const { id } = request.params;
  const userId = request.header("userId");
  try {
    const deletedProduct = await Cart.updateOne(
      { userId: userId },
      { $pull: { product: { productId: id } } }
    );
    return response.status(200).json({ deletedProduct });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
