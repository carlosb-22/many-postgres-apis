// Import user service functions from the userModel file
import { createUserService, deleteUserService, getAllUserService, getUserByIdService, updateUserService } from "../models/userModel.js";

// Utility function to handle API responses consistently
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,      // HTTP status code
        message,     // Message describing the response
        data,        // Optional data payload
    });
};

// Controller function to create a new user
export const createUser = async (req, res, next) => {
    const { name, email } = req.body; // Extract user details from the request body
    try {
        const newUser = await createUserService(name, email); // Call service to create the user
        handleResponse(res, 201, "User created successfully", newUser); // Send success response
    } catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
};

// Controller function to fetch all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUserService(); // Call service to get all users
        handleResponse(res, 200, "Users fetched successfully", users); // Send success response
    } catch (error) {
        next(error);
    }
};

// Controller function to fetch a user by their ID
export const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id); // Call service to get user by ID
        if (!user) return handleResponse(res, 404, "User not found"); // Return 404 if user doesn't exist
        handleResponse(res, 200, "User fetched successfully", user); // Send success response
    } catch (error) {
        next(error);
    }
};

// Controller function to update a user by their ID
export const updateUserById = async (req, res, next) => {
    const { name, email } = req.body; // Extract updated user details
    const { id } = req.params; // Get user ID from request parameters

    try {
        const updatedUser = await updateUserService(id, name, email); // Call service to update the user
        if (!updatedUser) return handleResponse(res, 404, "User not found"); // Return 404 if user doesn't exist
        handleResponse(res, 200, "User updated successfully", updatedUser); // Send success response
    } catch (error) {
        next(error);
    }
};

// Controller function to delete a user by their ID
export const deleteUserById = async (req, res, next) => {
    const { id } = req.params; // Get user ID from request parameters
    try {
        const deleteUser = await deleteUserService(id); // Call service to delete the user
        if (!deleteUser) return handleResponse(res, 404, "User not found"); // Return 404 if user doesn't exist
        handleResponse(res, 200, "User successfully deleted", deleteUser); // Send success response
    } catch (error) {
        next(error);
    }
};
