const express = require("express");
const router = express.Router();
const db = require('../utils');

router.post("/", async(req,res) => {
    console.log("options");

    const options = req.body.options;
    console.log(options);

    const user = req.body.user;
    console.log(user);

    const sql = "INSERT INTO opcije ( idKorisnik, opcije )" +
     " VALUES ('" + user.id + "','" + options + "') RETURNING idOpcije";

    try {
        const result = await db.query(sql, []);
        return res.json(result.rows);
    } catch (err) {
        console.log(err);
        throw err
    }
});

module.exports = router;