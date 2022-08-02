const express = require("express");
const router = express.Router();
const db = require('../utils');

router.get("/", async(req,res) => {
    console.log("groups");

    //obrisi isteknute termine
    await db.query("DELETE FROM termin WHERE valjanost::date < current_date::date;", []);

    const sql = `SELECT idgrupa AS id, nazivgrupa AS name FROM grupa`;
    const result = await db.query(sql, []);
    console.log(result.rows);
    
    res.json(result.rows);
});

router.get("/members", async(req,res) => {
    console.log("members");

    const sql = `SELECT idKorisnik AS id, ime || ' ' || prezime AS ime FROM korisnik WHERE idUloga <> 0`;
    const result = await db.query(sql, []);
    console.log(result.rows);
    
    res.json(result.rows);
});

router.get("/coaches", async(req,res) => {
    console.log("coaches");

    const sql = `SELECT ime || ' ' || prezime AS ime FROM korisnik WHERE idUloga = 2`;
    const result = await db.query(sql, []);
    console.log(result.rows);
    
    res.json(result.rows);
});

router.get("/:id", async(req,res) => {
    console.log("group");
    const id = req.params.id;
    console.log(id);
    
    try {
        const sql = `SELECT grupa.idgrupa, nazivgrupa, nazivrazina, dan, korisnik.ime || ' ' || korisnik.prezime AS trener,
                    TO_CHAR(vrijemepoc::time, 'HH24:MM') AS vrijemepoc,TO_CHAR(vrijemezavr::time, 'HH24:MM') AS vrijemezavr, nazivaktivnost,
                    (SELECT array_to_json(array_agg(row_to_json(clanovi)))
                    FROM (SELECT clanGrupa.idKorisnik AS id, korisnik.ime || ' ' || korisnik.prezime AS ime 
                    FROM clanGrupa 
                    JOIN korisnik ON clanGrupa.idKorisnik = korisnik.idKorisnik
                    WHERE clanGrupa.idGrupa = grupa.idGrupa) clanovi) AS clanovi
                    FROM grupa 
                    JOIN termin ON termin.idTermin = grupa.idTermin 
                    JOIN aktivnost ON grupa.idAktivnost = aktivnost.idAktivnost
                    JOIN razina ON grupa.idRazina = razina.idRazina
                    JOIN korisnik ON grupa.idTrener = korisnik.idKorisnik
                    WHERE grupa.idGrupa = ` + id;
        const result = await db.query(sql, []);
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        throw error;
    }
});

router.post("/add", async(req,res) => {
    console.log("add");

    const title = req.body.title;
    const level = req.body.level;
    const coach = req.body.coach;
    const day = req.body.day;
    const beggining = req.body.beggining;
    const ending = req.body.ending;
    const activity = req.body.activity;
    const members = req.body.members;

    console.log(title);
    console.log(level);
    console.log(coach);
    console.log(day);
    console.log(beggining);
    console.log(ending);
    console.log(activity);
    console.log(members);

    var trener = coach.split(" ");
    console.log(trener);

    var idGrupa = 0;
    try {
        const termin_sql = "INSERT INTO termin (dan, vrijemePoc, vrijemeZavr, valjanost) VALUES ('" + day + "','" + beggining + "','" + ending + "', (SELECT CURRENT_DATE + '1 YEAR'::interval)) RETURNING idTermin";
        const termin = await db.query(termin_sql, []);
        var idTermin = termin.rows[0].idtermin;
        console.log(termin.rows[0].idtermin);

        const grupa_sql = "INSERT INTO grupa (nazivgrupa, idrazina, idtrener, idaktivnost, idtermin) VALUES ('" + title + "', (SELECT idrazina FROM razina WHERE nazivrazina = '" + level + "'),(SELECT idkorisnik FROM korisnik WHERE ime = '" + trener[0] + "' AND prezime = '" + trener[1] + "'), (SELECT idaktivnost FROM aktivnost WHERE nazivaktivnost = '" + activity + "')," + idTermin + ") RETURNING idGrupa";
        const grupa = await db.query(grupa_sql, []);
        idGrupa = grupa.rows[0].idgrupa
        console.log(grupa.rows[0].idgrupa);

    } catch (error) {
        throw error;
    }

    var result = undefined;
    for (let idKorisnik of members) {
        try {
            console.log(idKorisnik);
            console.log(idGrupa);
            
            const ClanGrupa_sql = "INSERT INTO ClanGrupa (idkorisnik, idgrupa) VALUES ('" + idKorisnik + "','" + idGrupa + "')";
            result = await db.query(ClanGrupa_sql, []);
        } catch (error) {
            throw error;
        }
    }

    res.json(result.rows)
});

router.post("/edit/:id", async(req,res) => {
    console.log("edit");
    const idGrupa = req.params.id;
    console.log(idGrupa);

    const title = req.body.title;
    const level = req.body.level;
    const coach = req.body.coach;
    const day = req.body.day;
    const beggining = req.body.beggining;
    const ending = req.body.ending;
    const activity = req.body.activity;
    const members = req.body.members;

    console.log(title);
    console.log(level);
    console.log(coach);
    console.log(day);
    console.log(beggining);
    console.log(ending);
    console.log(activity);
    console.log(members);

    var trener = coach.split(" ");
    console.log(trener);

    try {
        const termin_sql = "UPDATE termin SET dan = '" + day + "', vrijemePoc = '" + beggining + "', vrijemeZavr = '" + ending + "' WHERE idtermin = (SELECT idTermin FROM grupa WHERE idGrupa = " + idGrupa + ")";
        const termin = await db.query(termin_sql, []);

        const grupa_sql = "UPDATE grupa SET nazivgrupa = '" + title + "', idrazina = (SELECT idrazina FROM razina WHERE nazivrazina = '" + level + "'), idtrener = (SELECT idkorisnik FROM korisnik WHERE ime = '" + trener[0] + "' AND prezime = '" + trener[1] + "'), idaktivnost = (SELECT idaktivnost FROM aktivnost WHERE nazivaktivnost = '" + activity + "') WHERE idGrupa = " + idGrupa;
        const grupa = await db.query(grupa_sql, []);
        console.log(grupa.rows);

    } catch (error) {
        throw error;
    }

    var result = undefined;
    const delete_sql = "DELETE FROM ClanGrupa WHERE idgrupa = " + idGrupa;
    await db.query(delete_sql, []);
    
    for (let idKorisnik of members) {
        try {
            console.log(idKorisnik);
            console.log(idGrupa);
            
            const ClanGrupa_sql = "INSERT INTO ClanGrupa (idkorisnik, idgrupa) VALUES ('" + idKorisnik + "','" + idGrupa + "')";
            result = await db.query(ClanGrupa_sql, []);
        } catch (error) {
            throw error;
        }
    }

    res.json(result.rows)


});

router.post("/delete/member", async(req,res) => {
    console.log("delete");
    const idGrupa = req.body.id;
    const idKorisnik = req.body.idkorisnik;
    console.log(idGrupa);
    console.log(idKorisnik)

    try {
        const sql = "DELETE FROM clanGrupa WHERE idgrupa = " + idGrupa + " AND idKorisnik = " + idKorisnik;
        const result = await db.query(sql, []);
        console.log(result.rows);

        res.json(result.rows);

    } catch (error) {
        throw error;
    }
});

router.delete("/:id", async(req,res) => {
    console.log("delete");
    const id = req.params.id;
    console.log(id);

    try {

        const sql1 = "SELECT idtermin FROM grupa WHERE idgrupa = " + id;
        const result1 = await db.query(sql, []);
        const idtermin = result1[0].idtermin;
        await db.query("DELETE FROM termin WHERE idtermin = " + idtermin, []);

        const sql = "DELETE FROM grupa WHERE idgrupa = " + id;
        const result = await db.query(sql, []);
        console.log(result.rows);

        res.json(result.rows);

    } catch (error) {
        throw error;
    }
});



router.post("/arrivals/:id", async(req,res) => {
    console.log("arrivals");
    const idtrening = req.params.id;
    console.log(idtrening);

    const arrivals = req.body.data.arrivals;
    const absence = req.body.data.absence;
    console.log(arrivals.length);
    console.log(absence);

    for(let user of absence) {
        try {

            var sql = await db.query(`SELECT brnadoknada FROM korisnik WHERE idkorisnik = ` + user.id, []);
            var nadoknade = sql.rows[0].brnadoknada;
            console.log(user.id);
            console.log(nadoknade);
            nadoknade = nadoknade+1
            console.log(nadoknade);

            sql = `UPDATE korisnik SET brNadoknada = ` + nadoknade + ` WHERE idkorisnik = ` + user.id;
            const result = await db.query(sql, []);
            console.log(result.rows);
            
        } catch (error) {
            throw error;
        }
    }

    try {
        const sql = "UPDATE trening SET dolaznost = " + arrivals.length + " WHERE idtrening = " + idtrening;
        const result = await db.query(sql, []);
        console.log(result.rows);

        res.json(result.rows);

    } catch (error) {
        throw error;
    }
});


module.exports = router;