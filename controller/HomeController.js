import Home from "../model/HomeModel.js";


export const addHome = async (request, response) => {
    const { description,category} = request?.body; 
    // const pat=request.file?.filename;
    var path = request?.files.map((file) => {
      return file.filename;
    });
    console.log(request.body,request.file)
    try {
      const home = await Home.create({
        description:description,
        category:category,
        image: path,
      });
  
      await home.save();
      return response.status(200).json(home);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  };

  export const getHomeData = async (request, response) => {
    try {
      // console.log(query)
      const home = await Home.find();
      return response.status(200).json(home);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  };