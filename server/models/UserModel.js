const db = require('../utils')
const bcrypt = require("bcrypt");

module.exports = class User {
        constructor(firstName, lastName, mail, dateOfBirth, phone, password, role,registration) {
            this.id = undefined;
            this.firstName = firstName;
            this.lastName = lastName;
            this.mail = mail;
            this.dateOfBirth = dateOfBirth;
            this.phone = phone;
            this.password = password;
            this.role = role;
            this.registration = registration;
            this.experiance = 0;
            this.compensation = 0;
            this.fee = undefined;
        }

        get age() {
            date = new Date()
            return date.getFullYear() - this.DOB.getFullYear();
        }

        static async setAdminRegistration() {
            var today = new Date();
            var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            console.log(date);
            const sql = `UPDATE korisnik SET registracija = '` + date + `' WHERE idUloga = 0`;
            
            try {
                const result = await db.query(sql, []);
                console.log(result.rows);
                return result.rows;
            } catch (err) {
                console.log(err);
                throw err
            }
        }

        //dohvat korisnika na osnovu email adrese
        static async fetchByEmail(email) {

            let results = await dbGetUserByEmail(email)
            let newUser = new User();

            if( results.length > 0 ) {
                newUser = new User(results[0].ime, results[0].prezime, 
                    results[0].mail, results[0].datumrod, results[0].brmob, 
                    results[0].lozinka, results[0].nazivuloga, results[0].registracija,
                    results[0].brNadoknada)
                newUser.id = results[0].idkorisnik;
                newUser.experiance = results[0].iskustvo;                
            }
            return newUser
        }

        //dohvat korisnika na osnovu id korisnika
        static async fetchByUserId(id) {
       
            let results = await dbGetUserById(id)
            let newUser = new User()

            if( results.length > 0 ) {
                newUser = new User(results[0].ime, results[0].prezime, 
                    results[0].mail, results[0].datumrod, results[0].brmob, 
                    results[0].lozinka, results[0].nazivuloga, results[0].registracija,
                    results[0].brNadoknada)
                newUser.id = results[0].idkorisnik;
                newUser.experiance = results[0].iskustvo;
                newUser.fee = results[0].clanarine;
            }
            return newUser
        }

        // uredi korisnika koji postoji
        async editUser(firstName, lastName, mail, password, phone, dateOfBirth) {
            console.log("edit");
            await dbEditUser(this.id,firstName, lastName, mail, password, phone, dateOfBirth)
            this.firstName = firstName;
            this.lastName = lastName;
            this.mail = mail;
            this.password = password;
            this.dateOfBirth = dateOfBirth;
            this.phone = phone;
        }

        //da li je korisnik pohranjen u bazu podataka?
        isPersisted() {
            return this.id !== undefined
        }

        //provjera zaporke
        checkPassword(password) {
            return bcrypt.compareSync(password,this.password);
        }

        //pohrana korisnika u bazu podataka
        async persist() {
            try {
                let userId = await dbNewUser(this)
                this.id = userId
                console.log(userId)
                let membership = await getMembership(userId)
                this.fee = membership.fee;
            } catch(err) {
                console.log("ERROR persisting user data: " + JSON.stringify(this))
                throw err
            }
        }
    };

//dohvat korisnika iz baze podataka na osnovu email adrese (stupac mail)
dbGetUserByEmail = async (mail) => {
    const sql = `SELECT korisnik.idkorisnik, ime, prezime, mail, TO_CHAR(datumrod, 'DD/MM/YYYY') AS datumrod,
    brmob, brnadoknada, lozinka, nazivuloga,
    (date_part('year',CURRENT_DATE) - date_part('year',registracija)) AS iskustvo,
    TO_CHAR(registracija, 'YYYY-MM-DD') AS registracija
    FROM korisnik
    JOIN uloga ON korisnik.idUloga = uloga.idUloga
	WHERE korisnik.mail = '` + mail + `'`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

//dohvat korisnika iz baze podataka na osnovu id korisnika (stupac id)
dbGetUserById = async (id) => {
    const sql = `SELECT korisnik.idKorisnik, ime, prezime, mail,
    TO_CHAR(datumrod, 'DD/MM/YYYY') AS datumrod, brmob, nazivuloga, 
    (date_part('year',CURRENT_DATE) - date_part('year',registracija)) AS iskustvo,
	brnadoknada, TO_CHAR(registracija, 'YYYY-MM-DD') AS registracija,
    (SELECT array_to_json(array_agg(row_to_json(clanarine)))
        FROM (SELECT clanarina.idclan, clanarina.mjesec || ', ' || clanarina.godina AS mjesec,
        clanarina.iznos,
        CASE
            WHEN datumuplate is null THEN 0
            ELSE 1
        END 
        AS placeno
        FROM clanarina WHERE korisnik.idKorisnik = clanarina.idKorisnik
        AND clanarina.mjesec = (SELECT EXTRACT(MONTH FROM current_date)) 
		AND clanarina.godina = (SELECT EXTRACT(YEAR FROM current_date))
        ORDER BY clanarina.godina ASC, clanarina.mjesec ASC LIMIT 1)
        clanarine) AS clanarine
    FROM korisnik
    JOIN uloga ON korisnik.idUloga = uloga.idUloga
    WHERE korisnik.idkorisnik = ` + id;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

//umetanje zapisa o korisniku u bazu podataka
dbNewUser = async (user) => {    

    var role = 0;
    if (user.role == "Član Kluba"){
        role = 1;
      } else if (user.role == "Trener"){
        role = 2;
      }
    const sql = "INSERT INTO korisnik ( ime, prezime, mail, datumRod, lozinka, brMob, idUloga, registracija, brNadoknada )" +
     " VALUES ('" + user.firstName + "','" + user.lastName + "','" + user.mail + "','" + user.dateOfBirth 
     + "','" + user.password + "','" + user.phone + "','" + role + "','" + user.registration + "','" + user.compensation + "') RETURNING idKorisnik";
    

    try {
        const result = await db.query(sql, []);
        return result.rows[0].idkorisnik;
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbEditUser = async (id,firstName, lastName, mail, password, phone, dateOfBirth) => {
    const sql = "UPDATE korisnik SET ime = '" + firstName + "', prezime = '" + lastName + "', mail = '" + mail + 
    "', datumRod = '" + dateOfBirth + "', lozinka = '" + password + "', brMob = '" + phone + "' WHERE idKorisnik = '" + id + "'";
    
    try {
        const result = await db.query(sql, []);
        console.log(result.rows[0]);
    } catch (err) {
        console.log(err);
        throw err
    }
}

getMembership = async(id) => {
    console.log(id);

    const sql1 = `SELECT array_to_json(array_agg(row_to_json(clanarine))) AS fee
    FROM (SELECT clanarina.idclan, clanarina.mjesec || ', ' || clanarina.godina AS mjesec,
        clanarina.iznos
        FROM clanarina WHERE clanarina.idKorisnik = ` + id + ` AND datumuplate is null) clanarine`;

    try {
        const returnsql = await db.query(sql1, []);
        return returnsql.rows[0];
    } catch (err) {
        console.log(err);
        throw err
    }
}
