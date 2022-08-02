const express = require("express");
const router = express.Router();
const db = require('../utils');

router.get("/", async(req,res) => {
    console.log("gallery");

    const sql = `SELECT * FROM multimedija`;
    const result = await db.query(sql, []);
    console.log(result.rows);
    
    res.json(result.rows);
});

router.post("/add", async(req,res) => {
    console.log("gallery add");

    const name = req.body.name;
    const uri = req.body.image;

    console.log(name);
    console.log(uri);

    try {
        const sql = "INSERT INTO multimedija (nazivMulti, uri) VALUES ('" + name + "', '" + uri + "') RETURNING idMulti";
        const result = await db.query(sql, []);
        console.log(result.rows[0]);

        res.json(result.rows[0]);

    } catch (error) {
        throw error;
    }

});

router.delete("/:id", async(req,res) => {
    console.log("delete");
    const id = req.params.id;
    console.log(id);

    try {
        const sql = "DELETE FROM multimedija WHERE idMulti = " + id;
        const result = await db.query(sql, []);
        console.log(result.rows);

        res.json(result.rows);

    } catch (error) {
        throw error;
    }
});

module.exports = router;