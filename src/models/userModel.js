// Import the 'pool' object from the database configuration file.
// 'pool' manages connections to the PostgreSQL database.
import pool from "../config/db.js";

// Service to get all users from the database.
export const getAllUserService = async () => {
    // Execute a SQL query to select all rows from the 'users' table.
    const result = await pool.query("SELECT * FROM users");
    // Return the rows (all users) from the query result.
    return result.rows;
};

// Service to get a single user by their ID.
export const getUserByIdService = async (id) => {
    // Execute a SQL query to select a user with the specified ID.
    // '$1' is a placeholder for the first parameter in the array [id].
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    // Return the first row from the result, which corresponds to the user with the given ID.
    return result.rows[0];
};

// Service to create a new user in the database.
export const createUserService = async (name, email) => {
    // Execute a SQL query to insert a new user into the 'users' table.
    // '$1' and '$2' are placeholders for the 'name' and 'email' parameters.
    // The 'RETURNING *' clause ensures the newly created user is returned.
    const result = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
    );
    // Return the first row from the result, which is the newly created user.
    return result.rows[0];
};

// Service to update an existing user by their ID.
export const updateUserService = async (id, name, email) => {
    // Execute a SQL query to update the user's name and email based on their ID.
    // '$1', '$2', and '$3' are placeholders for 'name', 'email', and 'id' respectively.
    // The 'RETURNING *' clause ensures the updated user is returned.
    const result = await pool.query(
        "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
        [name, email, id]
    );
    // Return the first row from the result, which is the updated user.
    return result.rows[0];
};

// Service to delete a user by their ID.
export const deleteUserService = async (id) => {
    // Execute a SQL query to delete a user with the specified ID.
    // '$1' is a placeholder for the 'id' parameter.
    // The 'RETURNING *' clause ensures the deleted user is returned.
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
    // Return the first row from the result, which is the deleted user.
    return result.rows[0];
};