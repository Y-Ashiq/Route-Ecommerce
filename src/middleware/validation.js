import { AppError } from "../util/AppError.js";



export const validation = (schema) => {
  return (req, res, next) => {
    let filters = {};
    if(req.file) {
    filters = {image: req.file, ... req.body, ...req.params, ...req.query}
    }else if(req.files) {
    filters = {...req.files, ... req.body, ...req.params, ...req.query}
    }else {
    filters = {...req.body ,...req.params,...req.query}
    }
    let { error } = schema.validate(filters, { abortEarly: false });

    if (!error) {
      
      next();
    } else {
      let errorMessage = error.details.map((key) => key.message);
      console.log(error);
      next(new AppError(errorMessage, 401));
    }
  };
};
