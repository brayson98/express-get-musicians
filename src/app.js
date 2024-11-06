const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")
const musicianRoutes = require("../routes/musicians")
const bandRoutes = require("../routes/band")
const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.use(express.json())


app.use("/musicians", musicianRoutes)

app.use("/bands", bandRoutes)



module.exports = app;