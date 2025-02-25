// Import the 'express' library to create and manage routes.
import express from "express";

// Import controller functions for handling user-related operations.
// These functions contain the logic for creating, reading, updating, and deleting users.
import {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    updateUserById,
} from "../controllers/userController.js";

// Import the 'validateUser' middleware to validate user input before processing requests.
import validateUser from "../middlewares/inputValidator.js";

// Create an instance of an Express router to define routes.
const router = express.Router();

// Define a POST route for creating a new user.
// The 'validateUser' middleware ensures the request body is valid before calling 'createUser'.
router.post("/user/", validateUser, createUser);

// Define a GET route to fetch all users.
// When a request is made to '/user', the 'getAllUsers' controller function is called.
router.get("/user", getAllUsers);

// Define a GET route to fetch a single user by their ID.
// The ':id' in the route is a dynamic parameter representing the user's ID.
// The 'getUserById' controller function handles the request.
router.get("/user/:id", getUserById);

// Define a PUT route to update an existing user by their ID.
// The 'validateUser' middleware ensures the request body is valid before calling 'updateUserById'.
// The ':id' parameter specifies which user to update.
router.put("/user/:id", validateUser, updateUserById);

// Define a DELETE route to delete a user by their ID.
// The 'validateUser' middleware ensures the request is valid before calling 'deleteUserById'.
// The ':id' parameter specifies which user to delete.
router.delete("/user/:id", validateUser, deleteUserById);

// Export the router so it can be used in other parts of the application (e.g., in the main server file).
export default router;