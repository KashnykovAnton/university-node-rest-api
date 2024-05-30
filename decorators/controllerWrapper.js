const controllerWrapper = (controller) => {
  const decoratorFunction = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return decoratorFunction;
};

export default controllerWrapper;
