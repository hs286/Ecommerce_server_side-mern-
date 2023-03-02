import Jwt from "jsonwebtoken";
import Admin from "../model/AdminModel.js";

export const addAdmin = async (request, response) => {
  const { email, name, password, role } = request.body;
  try {
    const newAdmin = await Admin.create({
      email: email,
      name: name,
      password: password,
      role: role,
    });
    newAdmin.save();
    return response.status(200).json(newAdmin);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const updateAdmin = async (request, response) => {
  const { email, name, password, role } = request.body;
  var { id } = request.params;
  try {
    const admin = await Admin.findByIdAndUpdate(
      { _id: id },
      { email: email, name: name, password: password, role: role },
      { new: true }
    );
    return response.status(200).json(admin);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deleteAdmin = async (request, response) => {
  var { id } = request.params;
  try {
    const admin = await Admin.findByIdAndDelete({ _id: id });
    return response.status(200).json(admin);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const checkAdminLogin = async (request, response) => {
  var { email = "", password = "" } = request.query;
  try {
    const admin = await Admin.findOne({
      email: email,
      password: password,
    });
    if (admin != "") {
      const accessToken = Jwt.sign(
        { email: admin.email, _id: admin._id, role: admin.role },
        process.env.ACCESS_TOKEN
      );
      return response
        .status(200)
        .json({ token: accessToken });
    } else {
      return response.status(500).json();
    }
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
