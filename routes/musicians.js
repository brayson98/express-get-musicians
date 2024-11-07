const express = require("express");
const router = express.Router();
const {Musician} = require("../models/index");
const {check, validationResult} = require("express-validator")

router.get("/", async (req, res) => {;
    try {
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve musicians" });
        console.error(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const musician = await Musician.findByPk(req.params.id);
        if (!musician) {
            return res.status(404).json({ error: "Musician not found" });
        }
        res.json(musician);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve musician" });
        console.error(error);
    }
});

router.post('/', [check("name").not().isEmpty().isLength({ min: 2, max: 20 }).trim(),
      [check("instrument").not().isEmpty().isLength({ min: 2, max: 20 }).trim()]], async (req, res) => {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({error: errors.array()})
    } else {
    try {
        const musician = await Musician.create(req.body);
        res.status(201).json(musician); // send JSON response with the created musician
    } catch (err) {
        res.status(500).json({ error: "Failed to create musician" });
        console.error(err);
    }
}
});

router.put('/:id', async (req, res) => {
    try {
        let musician = await Musician.findByPk(req.params.id);
        if (!musician) {
            return res.status(404).json({ error: "Musician not found" });
        }
        musician = await musician.update(req.body); // no need for where clause with instance.update()
        res.json(musician);
    } catch (err) {
        res.status(500).json({ error: "Failed to update musician" });
        console.error(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let musician = await Musician.findByPk(req.params.id);
        if (!musician) {
            return res.status(404).json({ error: "Musician not found" });
        }
        await musician.destroy();
        res.status(204).send(); // No content for successful deletion
    } catch (err) {
        res.status(500).json({ error: "Failed to delete musician" });
        console.error(err);
    }
});

module.exports = router;
