import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import petsRoutes from "./routes/petsRoute.js";
import usersRoutes from "./routes/usersRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import morgan from 'morgan';
import bodyParser from 'body-parser';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/api/pets", petsRoutes);
app.use("/api/users",usersRoutes);
app.use("/api/admin",adminRoutes)

// app.get('/',(req,res)=>{
// res.send('server is running')
// })

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);