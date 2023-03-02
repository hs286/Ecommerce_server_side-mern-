export const CheckPermission = async (request, response, next) => {
  const token = request.header("authorization");
  if (!token) {
    const object = {
      error: true,
      message: "Current method is not allowed against this users",
    };
    return response.status(500).json(object);
  } else {
    next();
  }
};
