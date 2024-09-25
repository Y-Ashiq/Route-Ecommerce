import { AppError } from "../util/AppError.js";

export const validation = (schema) => {
  return (req, res, next) => {
    let filters = {};

    if (req.file || req.files) {
      filters = {
        image: req.file ? req.file : req.files,
        ...req.body,
        ...req.params,
        ...req.query,
      };
    } else {
      filters = { ...req.body, ...req.params, ...req.query };
    }
    let { error } = schema.validate(filters, { abortEarly: false });

    if (!error) {
      next();
    } else {
      let errorMessage = error.details.map((key) => key.message);
      next(new AppError(errorMessage, 401));
    }
  };
};
