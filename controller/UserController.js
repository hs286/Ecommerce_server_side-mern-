import  Jwt  from "jsonwebtoken";
import User from "../model/UserModel.js";
import Cart from "../model/CartModel.js";


export const addUser = async (request,response) => {
    const { email, name, password,role } = request.body;
    console.log(request.body)
    try {
      const user = await User.findOne({ email });
      console.log(user)
      if (user) {
        const error = {
          error: true,
          message: `User against this email: ${email} is not registered`,
        };
        return response.status(500).json(error);
      }
        const newUser = await User.create({
          email: email,
          name: name,
          password: password,
          role:role,
        });
        newUser.save();
        return response.status(200).json(newUser);
    } catch (error) {
        console.log(error.message)
        return response.status(500).json(error.message);
      }
};

export const updateUser =async(request,response) => {
    const { email, name, password,role } = request.body;
    var { id } = request.params;
    try{
        const updateUser =await User.findByIdAndUpdate(
        {_id:id},
        { email:email, name:name,password:password,role:role },
        { new: true }
        );
        return response.status(200).json(updateUser);
    } catch (error) {
    return response.status(500).json(error.message);
  }
}

export const deleteUser =async(request,response) => {
    var { id } = request.params;
    try{
        const deleteUser =await User.findByIdAndDelete(
        {_id:id}
        );
        const deleteUserCart = await Cart.findOneAndDelete(
          {userId:id}
        )
        return response.status(200).json({deleteUser,deleteUserCart});
    } catch (error) {
    return response.status(500).json(error.message);
  }
}

export const getAllUser = async(request,response) => {
    try{
        const getUser = await User.find();
        return response.status(200).json(getUser);
    } catch (error) {
    return response.status(500).json(error.message);
  }
}

export const getUserById = async(request,response) => {
  const { id } = request.params;
  try{
      const getUser = await User.find({_id:id});
      return response.status(200).json(getUser);
  } catch (error) {
  return response.status(500).json(error.message);
}
}

export const LoginUser = async (request, response) => {
    var { email='', password='' } = request.query;
    if (!email&&!password) {
      const error = {
        error: true,
        message: `Email and Password feild should not be empty`,
      };
      return response.status(500).json(error);
    }
    else if(!password){
      const error = {
        error: true,
        message: `Password feild should not be empty`,
      };
      return response.status(500).json(error);
    }
    else if(!email){
      const error = {
        error: true,
        message: `Email feild should not be empty`,
      };
      return response.status(500).json(error);
    }
    try {
      let user = await User.findOne({ email });
      if (!user) {
        const error = {
          error: true,
          message: `User against this email: ${email} is not registered`,
        };
        return response.status(500).json(error);
      }
      user = await User.findOne({
        email: email,
        password: password,
      });
      if (!user) {
        const error = {
          error: true,
          message: `Wrong Password`,
        };
        return response.status(500).json(error);
      }
      if (user != "") {
        const accessToken = Jwt.sign(
          { email: user.email, _id: user._id },
          process.env.ACCESS_TOKEN
        );
        return response
          .status(200)
          .json({ token: accessToken });
      } 
    } catch (error) {
      return response.status(500).json(error.message);
    }
  };