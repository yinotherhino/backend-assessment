import express from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser, aggregateUsers } from "../controllers/user.controller";
import { validateRequest } from "./middleware";
import { createUserSchema, updateUserSchema, aggregationQuerySchema } from "./validators/user.validator";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - age
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         age:
 *           type: number
 *           description: The age of the user
 *         city:
 *           type: string
 *           description: The city of the user
 *       example:
 *         id: 60c72b2f9b1e8e8f12345678
 *         username: johndoe
 *         email: johndoe@example.com
 *         age: 25
 *         city: New York
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/", validateRequest(createUserSchema), createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put("/:id", validateRequest(updateUserSchema), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", deleteUser);

// /**
//  * @swagger
//  * /users/paginated:
//  *   get:
//  *     summary: Get paginated users
//  *     tags: [Users]
//  *     parameters:
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           description: The page number (default is 1)
//  *       - in: query
//  *         name: pageSize
//  *         schema:
//  *           type: integer
//  *           description: The number of users per page (default is 10)
//  *     responses:
//  *       200:
//  *         description: A paginated list of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/User'
//  *                 pagination:
//  *                   type: object
//  *                   properties:
//  *                     totalItems:
//  *                       type: integer
//  *                     currentPage:
//  *                       type: integer
//  *                     totalPages:
//  *                       type: integer
//  */
// router.get("/paginated", validateRequest(paginationQuerySchema), getPaginatedUsers);

/**
 * @swagger
 * /users/aggregate:
 *   get:
 *     summary: Aggregate users by dynamic parameters
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: boolean
 *           description: Group users by city
 *       - in: query
 *         name: age
 *         schema:
 *           type: boolean
 *           description: Group users by age
 *     responses:
 *       200:
 *         description: Aggregated data of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                       age:
 *                         type: number
 *                   totalUsers:
 *                     type: integer
 *                   averageAge:
 *                     type: number
 */
router.get("/aggregate", validateRequest(aggregationQuerySchema), aggregateUsers);

export default router;
