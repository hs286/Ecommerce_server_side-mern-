import Product from "../model/ProductModel.js";

export const addProduct = async (request, response) => {
  const { name, description, feature, price, discount, adminId } = request.body;
  var path = request?.files.map((file) => {
    return file.path;
  });
  try {
    const newProduct = await Product.create({
      name: name,
      description: description,
      feature: feature,
      price: price,
      discount: discount,
      adminId: adminId,
      image: path,
    });
    await newProduct.save();
    return response.status(200).json(newProduct);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const updateProduct = async (request, response) => {
  const { email, name, password, role } = request.body;
  var { id } = request.params;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { email: email, name: name, password: password, role: role },
      { new: true }
    );
    return response.status(200).json(updateProduct);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deleteProduct = async (request, response) => {
  var { id } = request.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete({ _id: id });
    return response.status(200).json(deleteProduct);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getAllProduct = async (request, response) => {
  try {
    const getProducts = await Product.find();
    return response.status(200).json(getProducts);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
