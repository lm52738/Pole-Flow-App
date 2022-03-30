const db = require('../utils')
const bcrypt = require("bcrypt");

module.exports = class User {
        constructor(firstName, lastName, mail, dateOfBirth, phone, password, role) {
            this.id = undefined;
            this.firstName = firstName;
            this.lastName = lastName;
            this.mail = mail;
            this.password = password;
            this.dateOfBirth = dateOfBirth;
            this.phone = phone;
            this.role = role;
        }

        get age() {
            date = new Date()
            return date.getFullYear() - this.DOB.getFullYear();
        }

        //dohvat korisnika na osnovu email adrese
        static async fetchByEmail(email) {

            let results = await dbGetUserByEmail(email)
            let newUser = new User()

            if( results.length > 0 ) {
                newUser = new User(results[0].ime, results[0].prezime, 
                    results[0].mail, results[0].datumrod, results[0].brmob, 
                    results[0].lozinka, results[0].iduloga)
                newUser.id = results[0].idkorisnik;
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
                    results[0].lozinka, results[0].iduloga)
                newUser.id = results[0].idkorisnik
            }
            return newUser
        }

        // uredi korisnika koji postoji
        async editUser(firstName, lastName, mail, password, phone, role, dateOfBirth) {
            await dbEditUser(this.id,firstName, lastName, mail, password, phone, role, dateOfBirth)
            this.firstName = firstName;
            this.lastName = lastName;
            this.mail = mail;
            this.password = password;
            this.dateOfBirth = dateOfBirth;
            this.phone = phone;
            this.role = role;
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
            } catch(err) {
                console.log("ERROR persisting user data: " + JSON.stringify(this))
                throw err
            }
        }
    };

//dohvat korisnika iz baze podataka na osnovu email adrese (stupac mail)
dbGetUserByEmail = async (mail) => {
    const sql = `SELECT * FROM korisnik WHERE mail = '` + mail + `'`;
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
    const sql = `SELECT * FROM korisnik WHERE idKorisnik = ` + id;
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
    const sql = "INSERT INTO korisnik ( ime, prezime, mail, datumRod, lozinka, brMob, idUloga )" +
     " VALUES ('" + user.firstName + "','" + user.lastName + "','" + user.mail + "','" + user.dateOfBirth 
     + "','" + user.password + "','" + user.phone + "','" + user.role + "') RETURNING idKorisnik";
    
    try {
        const result = await db.query(sql, []);
        return result.rows[0].idKorisnik;
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbEditUser = async (id,firstName, lastName, mail, password, phone, role, dateOfBirth) => {
    const sql = "UPDATE korisnik SET ime = '" + firstName + "', prezime = '" + lastName + "', mail = '" + mail + 
    "', datumRod = '" + dateOfBirth + "', password = '" + password + "', brMob = '" + phone + "', idUloga = '" + role + "' WHERE id = '" + id + "'";
    
    try {
        const result = await db.query(sql, []);
        console.log(result.rows[0]);
    } catch (err) {
        console.log(err);
        throw err
    }
}