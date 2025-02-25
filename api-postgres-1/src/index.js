import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
dotenv.config(); // Asegúrate de que esta línea está antes de todo proceso

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);

// Error Handling middleware
app.use(errorHandling)

//Create table before starting server
createUserTable();

//Testing Postgres Connection
app.get("/", async(req, res)=>{
    const result = await pool.query("SELECT current_database()")
    console.log("The database name is: ", result.rows[0].current_database)
    res.send(`The database name is: ${result.rows[0].current_database}`)
})

//Server running
app.listen(port, ()=>{
    console.log("Aplicacion corriendo en:", port);
})