const controllerWrapper = (controller) => {
  const decoratorFunction = async (req, res, next) => {
    try {
      const result = await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return decoratorFunction;
};

export default controllerWrapper;
