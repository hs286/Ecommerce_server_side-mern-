import  Jwt  from "jsonwebtoken";
import User from "../model/UserModel.js";
import nodemailer from 'nodemailer'

export const addUser = async (request,response) => {
    const { email, name,age,phone, password } = request.body;

    
    try {
      const user = await User.findOne({ email });
      if (user) {
        const error = {
          error: true,
          message: `${email} already exists register with some other email address.`,
        };
        return response.status(500).json(error);
      }
      
        const newUser = await User.create({
          email: email,
          name: name,
          age:age,
          phone:phone,
          password: password,
          
        });
        newUser.save();
        return response.status(200).json(newUser);
    } catch (error) {
        console.log(error.message)
        return response.status(500).json(error.message);
      }
};

export const updateUserPassword =async(request,response) => {
    const { email, password} = request.body;
    try{
        const updateUser =await User.findOneAndUpdate(
        {email:email},
        {password:password},
        { new: true }
        );
        if(updateUser==null){
          const error = {
            error: true,
            message: `${email} This email is not valid.`,
          };
          return response.status(500).json(error);
        }
        console.log(updateUser)
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
    var { email, password } = request.body;
    console.log(email,password,request)
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
        const token = Jwt.sign(
          { email: user.email, _id: user._id },
          process.env.ACCESS_TOKEN
        );
        return response
          .status(200)
          .json({token});
      } 
    } catch (error) {
      return response.status(500).json(error.message);
    }
  };