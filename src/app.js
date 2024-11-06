const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")
const musicianRoutes = require("../routes/musicians")
const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.use(express.json())
app.use(express.urlencoded())

app.use("/musicians", musicianRoutes)



module.exports = app;