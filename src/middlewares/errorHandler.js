// Middleware function for handling errors in Express applications
const errorHandling = (err, req, res, next) => {
    // Log the error stack trace to the console for debugging purposes
    console.log("🚀 ~ errorHandling ~ err:", err.stack);

    // Send a 500 Internal Server Error response with a JSON object
    res.status(500).json({
        status: 500, // HTTP status code for internal server errors
        message: "Something went wrong", // Generic error message for the client
        error: err.message // Specific error message for better debugging
    });
};

// Export the error handling middleware for use in other parts of the application
export default errorHandling;
