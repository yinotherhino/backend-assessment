import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { CustomError } from "../utils/error";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    next(error);
    return;
  }
};
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, size, sortBy, order } = req.query;

    const limit = parseInt(size as string);
    const skip = (parseInt(page as string) - 1) * limit;

    const users = await User.find()
      .sort({ [sortBy as string]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({ success: true, total, page: parseInt(page as string), size: limit, users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const aggregateUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city, age } = req.query;

    // Build dynamic aggregation pipeline
    const pipeline: any[] = [];

    // Group by city if requested
    if (city) {
      pipeline.push({
        $group: {
          _id: "$city",
          totalUsers: { $sum: 1 },
          averageAge: { $avg: "$age" },
        },
      });
    }

    // Group by age if requested
    if (age) {
      pipeline.push({
        $group: {
          _id: "$age",
          totalUsers: { $sum: 1 },
          cities: { $addToSet: "$city" },
        },
      });
    }

    // If both are requested, combine them
    if (city && age) {
      pipeline.push({
        $group: {
          _id: { city: "$city", age: "$age" },
          totalUsers: { $sum: 1 },
        },
      });
    }

    // Execute aggregation
    const result = await User.aggregate(pipeline);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
