import Joi from "joi";


export const UserSpec= {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  
  export const LocationSpec = {
    name: Joi.string().required(),
    latitude: Joi.number().allow("").required(),
    longitude: Joi.number().allow("").required(),
  };
  
  export const StationSpec = {
    name: Joi.string().required(),
  };