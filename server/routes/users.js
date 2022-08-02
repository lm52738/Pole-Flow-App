const express = require("express");
const router = express.Router();
const db = require('../utils');

router.get("/", async(req,res) => {
    console.log("users");

    const sql = `SELECT idKorisnik,  ime || ' ' || prezime AS ime FROM korisnik`;
    const result = await db.query(sql, []);
    console.log(result.rows);
    
    res.json(result.rows);
});

router.get("/:id", async(req,res) => {
    const id = req.params.id;
    console.log(id);
  
    const sql = `SELECT korisnik.idKorisnik, ime || ' ' || prezime AS ime, mail,
    TO_CHAR(datumrod, 'YYYY-MM-DD') AS datumrod, brmob, nazivuloga AS uloga, 
    (date_part('year',CURRENT_DATE) - date_part('year',registracija)) AS iskustvo,
	brnadoknada,
(SELECT array_to_json(array_agg(row_to_json(clanarine)))
    FROM (SELECT clanarina.idclan, clanarina.mjesec || '. mjesec , ' || clanarina.godina AS mjesec,
    clanarina.iznos
	FROM clanarina WHERE korisnik.idKorisnik = clanarina.idKorisnik AND datumuplate is null
    ORDER BY clanarina.godina ASC, clanarina.mjesec ASC LIMIT 3)
 	clanarine) AS clanarine
    FROM korisnik
    JOIN uloga ON korisnik.idUloga = uloga.idUloga
    WHERE korisnik.idkorisnik = ` + id;
    const result = await db.query(sql, []);
    console.log(result.rows[0]);
      
    res.json(result.rows[0]);
});

router.post("/paid/:id", async(req,res) => {
    const idKorisnik = req.params.id;
    console.log(idKorisnik);

    const idclan = req.body.idclan;
    console.log(idclan);
  
    const sql = `UPDATE clanarina SET datumuplate = current_date::date WHERE idClan = ` + idclan + ` AND idKorisnik = ` + idKorisnik;
    const result = await db.query(sql, []);
    console.log(result.rows);
      
    res.json(result.rows);
});

router.delete("/:id", async(req,res) => {
    console.log("delete");
    const id = req.params.id;
    console.log(id);

    try {
        const sql = "DELETE FROM korisnik WHERE idkorisnik = " + id;
        const result = await db.query(sql, []);
        console.log(result.rows);

        res.json(result.rows);

    } catch (error) {
        throw error;
    }
});

module.exports = router;