import Joi from "joi";


export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");
export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

  



export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  scope: Joi.array().items(Joi.string()).example(["admin"]),

}).label("UserDetails");



export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");



  
  export const LocationSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Dunmore"),
    latitude: Joi.number().example(32).required(),
    longitude: Joi.number().example(18).required(),
    category:Joi.string().example("Type 2 Plug").required(),
    description: Joi.string().example("Tesco Shopping Centre").required(),
    img: Joi.string().optional().example(Joi.object({_id:IdSpec,img:Joi.string()})),
    stationid: IdSpec,



  })
  .label("Location");


  export const LocationSpecPlus = LocationSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("LocationPlus");
  export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");


  
  export const StationSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Waterford"),
    userid: IdSpec,
    locations: LocationArraySpec,
  })
  .label("Station");

export const StationSpecPlus = StationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("StationPlus");

export const StationArraySpec = Joi.array().items(StationSpecPlus).label("StationArray");



export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
