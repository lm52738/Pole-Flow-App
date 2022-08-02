const express = require("express");
const router = express.Router();
const db = require('../utils');
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async(req,res) => {
  console.log("admin calendar");

  const user = req.user;

  if (user.role == "Admin") {
    try {
        const sql = `SELECT TO_CHAR(trening.datum, 'YYYY-MM-DD') AS datum,
        (SELECT array_to_json(array_agg(row_to_json(treninzi)))
          FROM (SELECT tren.idtrening, tren.dolaznost, tren.odaziv,
          termin.idtermin, TO_CHAR(termin.vrijemepoc, 'HH24:MM') AS vrijemepoc, TO_CHAR(termin.vrijemezavr, 'HH24:MM') AS vrijemezavr,
          grupa.idgrupa, grupa.nazivgrupa, 
          razina.nazivrazina, aktivnost.nazivaktivnost,
          (korisnik.ime || ' ' || korisnik.prezime) as trener
          FROM trening AS tren
          JOIN termin ON termin.idtermin = tren.idtermin
          JOIN grupa ON grupa.idtermin = tren.idtermin
          JOIN razina ON grupa.idrazina = razina.idrazina
          JOIN aktivnost ON grupa.idaktivnost = aktivnost.idaktivnost
          JOIN korisnik ON korisnik.idkorisnik = grupa.idtrener
          WHERE tren.datum = trening.datum) treninzi ) AS treninzi
          FROM trening 
          GROUP BY datum
          ORDER BY datum
          LIMIT 50`;
        const result = await db.query(sql, []);
        console.log(result.rows);
            
        res.json(result.rows);
      } catch (error) {
        throw error;
      }

  } else if (user.role == "Trener") {

    try {
      const sql = `SELECT TO_CHAR(trening.datum, 'YYYY-MM-DD') AS datum,
      (SELECT array_to_json(array_agg(row_to_json(treninzi)))
        FROM (SELECT tren.idtrening, tren.dolaznost, tren.odaziv,
        termin.idtermin, TO_CHAR(termin.vrijemepoc, 'HH24:MM') AS vrijemepoc, TO_CHAR(termin.vrijemezavr, 'HH24:MM') AS vrijemezavr,
        grupa.idgrupa, grupa.nazivgrupa, 
        razina.nazivrazina, aktivnost.nazivaktivnost,
        (korisnik.ime || ' ' || korisnik.prezime) as trener
        FROM trening AS tren
        JOIN termin ON termin.idtermin = tren.idtermin
        JOIN grupa ON grupa.idtermin = tren.idtermin
        JOIN razina ON grupa.idrazina = razina.idrazina
        JOIN aktivnost ON grupa.idaktivnost = aktivnost.idaktivnost
        JOIN korisnik ON korisnik.idkorisnik = grupa.idtrener
        WHERE grupa.idtrener = `+ user.id +`
        AND tren.datum = trening.datum) treninzi ) AS treninzi
        FROM trening 
        JOIN grupa ON grupa.idtermin = trening.idtermin
        WHERE grupa.idtrener = `+ user.id +`
        GROUP BY datum
        ORDER BY datum
        LIMIT 50`;
      const result = await db.query(sql, []);
      console.log(result.rows);
          
      res.json(result.rows);
      } catch (error) {
        throw error;
      }

  } else {
    try {
      const sql = `SELECT TO_CHAR(trening.datum, 'YYYY-MM-DD') AS datum,
      (SELECT array_to_json(array_agg(row_to_json(treninzi)))
        FROM (SELECT tren.idtrening, tren.dolaznost, tren.odaziv,
        termin.idtermin, TO_CHAR(termin.vrijemepoc, 'HH24:MM') AS vrijemepoc, TO_CHAR(termin.vrijemezavr, 'HH24:MM') AS vrijemezavr,
        grupa.idgrupa, grupa.nazivgrupa, 
        razina.nazivrazina, aktivnost.nazivaktivnost,
        (korisnik.ime || ' ' || korisnik.prezime) as trener
        FROM trening AS tren
        JOIN termin ON termin.idtermin = tren.idtermin
        JOIN grupa ON grupa.idtermin = tren.idtermin
        JOIN razina ON grupa.idrazina = razina.idrazina
        JOIN aktivnost ON grupa.idaktivnost = aktivnost.idaktivnost
        JOIN korisnik ON korisnik.idkorisnik = grupa.idtrener
        JOIN clangrupa ON grupa.idgrupa = clangrupa.idgrupa
        WHERE clangrupa.idkorisnik = `+ user.id +`
        AND tren.datum = trening.datum) treninzi ) AS treninzi
        FROM trening 
        JOIN grupa ON grupa.idtermin = trening.idtermin
        JOIN clangrupa ON grupa.idgrupa = clangrupa.idgrupa
        WHERE clangrupa.idkorisnik = `+ user.id +`
        GROUP BY datum
        ORDER BY datum
        LIMIT 50`;
      const result = await db.query(sql, []);
      console.log(result.rows);
          
      res.json(result.rows);
      } catch (error) {
        throw error;
      }
  }
  
});

module.exports = router;