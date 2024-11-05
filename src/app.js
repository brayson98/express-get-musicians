const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.use(express.json())
app.use(express.urlencoded())

app.get("/musicians", async (req, res) => {
    try {
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve musicians" });
    }
});

app.get("/musicians/:id", async (req, res) => {
    try {
        const musician = await Musician.findByPk(req.params.id)
        res.json(musician);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve musician" });
    }
});

app.post('/musicians', async (req, res) => {
    try {
        const musician = await Musician.create(req.body);
        res.status(201).send(musician)
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
      }
})

app.put('/musicians/:id', async (req, res) => {
    try {
        let musician = await Musician.findByPk(req.params.id);
        if (!musician) return res.status(404);
        musician = await musician.update(req.body, {where: {id: req.params.id}})
        res.send(musician)
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
      }
})

app.delete('/musicians/:id', async (req, res) => {
    try {
        let musician = await Musician.findByPk(req.params.id);
        if (!musician) return res.sendStatus(404);
        musician = await musician.destroy();
        res.send(musician)
    }catch (err) {
        res.sendStatus(500);
        console.error(err);
      }
})



module.exports = app;