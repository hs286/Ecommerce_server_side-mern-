import { query } from "express";
import Service from "../model/ServiceModel.js";

export const addService = async (request, response) => {
  const { name,description,price,category,area,unit} = request?.body; 
  console.log()
  // const path=request.file?.filename;
  // var path = request?.files.map((file) => {
  //   return file.path;
  // });
  console.log(request.body)
  try {
    const newService = await Service.create({
      name: name,
      description:description,
      category:category,
      area:area,
      price: price,
      unit:unit,
      image: request.file.filename,
    });

    await newService.save();
    return response.status(200).json(newService);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getServiceById = async(request,response) => {
  const { id } = request.params;
  console.log(id)
  try{
      const Prod = await Service.findOne({_id:id});
      return response.status(200).json(Prod);
  } catch (error) {
  return response.status(500).json(error.message);
}};


export const updateService = async (request, response) => {

  var { id } = request.params;
  try {
    const updateService = await Service.findByIdAndUpdate(
      { _id: id },
      { image: request.file.filename},
      { new: true }
    );
    console.log(updateService)
    return response.status(200).json(updateService);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deleteService = async (request, response) => {
  var { id } = request.params;
  try {
    const deleteService = await Service.findByIdAndDelete({ _id: id });
    return response.status(200).json(deleteService);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getServices = async (request, response) => {
  const {category}=request.query;
  console.log(category,"in node")
  try {
    var query={};
    if(category=='undefined'){
      console.log(query)
      query={}
      console.log(query,"data")

    }
    else{
      console.log(query,"d")
      query={category:category}

      console.log(query,"f")

    }
    // console.log(query)
    const getServices = await Service.find(query);
    
    return response.status(200).json(getServices);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};




