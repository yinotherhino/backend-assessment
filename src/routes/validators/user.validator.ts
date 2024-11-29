import Joi from "joi";

export const userIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, "valid MongoDB ObjectId")
    .required()
    .messages({
      "string.pattern.base": "Invalid User ID format",
      "any.required": "User ID is required",
    }),
});

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).required(),
  city: Joi.string().min(2).max(50).required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(0),
  city: Joi.string().min(2).max(50),
})
  .or("username", "email", "age", "city")
  .messages({
    "object.missing": "At least one field (username, email, age, city) must be provided",
  });

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  size: Joi.number().integer().min(1).default(10),
  sortBy: Joi.string().valid("username", "email", "createdAt").default("createdAt"),
  order: Joi.string().valid("asc", "desc").default("desc"),
});

export const aggregationQuerySchema = Joi.object({
  city: Joi.boolean().truthy("true").falsy("false").default(false),
  age: Joi.boolean().truthy("true").falsy("false").default(false),
})
  .or("city", "age") // At least one parameter must be true
  .messages({
    "object.missing": "At least one query parameter (city or age) must be true",
  });
