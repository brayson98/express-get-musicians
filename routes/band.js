const express = require("express");
const router = express.Router();
const {Band, Musician} = require("../models/index");


router.get("/", async (req, res) => {
    try {
        const bands = await Band.findAll({
            include: [{
                model: Musician
            }]
        });
        res.json(bands);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Bands" });
        console.error(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const band = await Band.findByPk(req.params.id, {
            include: {
                model: Musician,
                attributes: ['id','name','instrument']
            }
        });
        if (!band) {
            return res.status(404).json({ error: "Band not found" });
        }
        res.json(band);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve band" });
        console.error(error);
    }
});

module.exports = router;