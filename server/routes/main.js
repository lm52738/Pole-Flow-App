const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const db = require('../utils');

router.get("/news", async(req,res) => {
    console.log("news");

    try {
        //obrisi isteknute obavijesti
        await db.query("DELETE FROM obavijest WHERE datumisteka::timestamp <= current_timestamp::timestamp;", []);

        const sql = `SELECT * FROM obavijest`;
        const result = await db.query(sql, []);
        console.log(result.rows);
        
        res.json(result.rows);
    } catch (error) {
        throw error;
    }
});

router.get("/news/:id", async(req,res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const sql = `SELECT idobavijest,naslov,tekst, TO_CHAR(datumisteka::date, 'DD/MM/YYYY') AS date, TO_CHAR(datumisteka::time, 'HH:MM') AS time  FROM obavijest WHERE idObavijest = ` + id;
        const result = await db.query(sql, []);
        console.log(result.rows[0]);
        
        res.json(result.rows[0]);
    } catch (error) {
        throw error;
    }
});

router.get("/newUsers", async(req,res) => {
    console.log("admin");

    try {
        const sql = `SELECT * 
        FROM korisnik JOIN opcije ON opcije.idKorisnik = korisnik.idKorisnik
        WHERE korisnik.registracija >= (SELECT registracija FROM korisnik WHERE idUloga = 0 ORDER BY registracija DESC LIMIT 1)`;
        const result = await db.query(sql, []);
        console.log(result.rows);
        
        res.json(result.rows);
    } catch (error) {
        throw error
    }
});


router.get("/reminder",verifyToken,  async(req,res) => {
    console.log("reminder");

    const user = req.user;
    console.log(user);

    try {
        const sql1 = `SELECT trening.odaziv
        FROM grupa
        JOIN termin ON grupa.idtermin = termin.idtermin 
    	JOIN trening ON trening.idtermin = termin.idtermin
        JOIN clangrupa ON grupa.idgrupa = clangrupa.idgrupa
        JOIN aktivnost ON grupa.idaktivnost = aktivnost.idaktivnost
    	WHERE trening.datum = current_date
    	AND clangrupa.idkorisnik = ` + user.id;
    
        const result1 = await db.query(sql1, []);
        console.log(result1.rows[0])
        const odaziv = result1.rows[0].odaziv;

        const array = [];
        if (odaziv != null) {
            array = Object.values(odaziv);
        }
        
        console.log(array);
        if (!array.includes(parseInt(user.id))) {
            const sql = `SELECT aktivnost.nazivaktivnost, trening.idtrening,
            TO_CHAR(termin.vrijemepoc::time, 'HH24:MM') || ' - ' || TO_CHAR(termin.vrijemezavr::time, 'HH24:MM') AS trajanje,
            TO_CHAR(trening.datum::date, 'Mon DD, YYYY') AS datum
            FROM grupa
            JOIN termin ON grupa.idtermin = termin.idtermin 
            JOIN trening ON trening.idtermin = termin.idtermin
            JOIN clangrupa ON grupa.idgrupa = clangrupa.idgrupa
            JOIN aktivnost ON grupa.idaktivnost = aktivnost.idaktivnost
            WHERE trening.datum = current_date
            AND clangrupa.idkorisnik = ` + user.id;

            const result = await db.query(sql, []);
            console.log(result.rows[0]);

            res.json(result.rows[0]);
        }
        
        
    } catch (error) {
        throw error;
    }

    
    
});

router.post("/reminder/:id", verifyToken, async(req,res) => {
    console.log("reminder");

    const id = req.params.id;
    console.log(id)

    const data = req.body.data;
    console.log(data);

    const user = req.user;
    console.log(user);

    if (data == true) {
        try {

            var sql = "SELECT odaziv FROM trening WHERE idtrening = " + id;
            const res = await db.query(sql, []);
            var odaziv = res.rows[0].odaziv;

            const array = [];
            if (odaziv != null) {
                array = Object.values(odaziv);
            }
            console.log(array);
            if (!array.includes(parseInt(user.id))) {
                array.push(parseInt(user.id))
                console.log(array);
                

                sql = "UPDATE trening SET odaziv = ARRAY [" + array + "] WHERE idtrening = " + id;
                const result = await db.query(sql, []);
                console.log(result.rows);
                res.json(result.rows);
            }
        } catch (error) {
            throw error;
        }
    }
});

router.post("/news/add", async(req,res) => {
    console.log("news add");

    const title = req.body.title;
    const text = req.body.text;
    const date = req.body.date;
    const time = req.body.time;
    
    var splitDate = date.split("/");
    splitDate.reverse();
    var splitTime = time.split(":");
    const expDate = splitDate.join("-") + " " + time;
    
    console.log (title);
    console.log (text);
    console.log (expDate);

    try {
        const sql = "INSERT INTO obavijest (naslov, tekst, datumIsteka) VALUES ('" + title + "','" + text + "','" + expDate + "') RETURNING idObavijest";
        const result = await db.query(sql, []);
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        throw error;
    }

});

router.post("/news/edit/:id", async(req,res) => {
    const id = req.params.id;
    console.log(id);

    const title = req.body.title;
    const text = req.body.text;
    const date = req.body.date;
    const time = req.body.time;
    
    var splitDate = date.split("/");
    splitDate.reverse();
    const expDate = splitDate.join("-") + " " + time;
    
    console.log (title);
    console.log (text);
    console.log (expDate);

    try {
        const sql = "UPDATE obavijest SET naslov = '" + title + "', tekst = '" + text + "', datumIsteka = '" + expDate + "' WHERE idObavijest = '" + id + "'";
        const result = await db.query(sql, []);
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        throw error;
    }
});

module.exports = router;