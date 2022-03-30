DROP TABLE IF EXISTS korisnik CASCADE;
DROP SEQUENCE IF EXISTS korisnik_SEQ CASCADE;

DROP TABLE IF EXISTS trening CASCADE;
DROP SEQUENCE IF EXISTS trening_SEQ CASCADE;

DROP TABLE IF EXISTS obavijest CASCADE;
DROP SEQUENCE IF EXISTS obavijest_SEQ CASCADE;

DROP TABLE IF EXISTS multimedija CASCADE;
DROP SEQUENCE IF EXISTS multimedija_SEQ CASCADE;

DROP TABLE IF EXISTS clanarina CASCADE;
DROP SEQUENCE IF EXISTS clanarina_SEQ CASCADE;

DROP TABLE IF EXISTS grupa CASCADE;
DROP SEQUENCE IF EXISTS grupa_SEQ CASCADE;

DROP TABLE IF EXISTS treningPraznici CASCADE;
DROP SEQUENCE IF EXISTS treningPraznici_SEQ CASCADE;

DROP TABLE IF EXISTS ClanGrupa CASCADE;
DROP SEQUENCE IF EXISTS ClanGrupa_SEQ CASCADE;

DROP TABLE IF EXISTS uloga CASCADE;
DROP SEQUENCE IF EXISTS uloga_SEQ CASCADE;

DROP TABLE IF EXISTS razina CASCADE;
DROP SEQUENCE IF EXISTS razina_SEQ CASCADE;

CREATE TABLE uloga
(
  idUloga INT NOT NULL,
  nazivUloga VARCHAR(50) NOT NULL,
  CONSTRAINT pitanja_pk PRIMARY KEY (idUloga)
);

CREATE SEQUENCE korisnik_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE korisnik
(
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(50) NOT NULL,
  datumRod DATE NOT NULL,
  mail VARCHAR(150) NOT NULL,
  brMob CHAR(10) NOT NULL,
  idUloga INT NOT NULL,
  brNadoknada INT,
  lozinka VARCHAR(150) NOT NULL,
  idKorisnik INT NOT NULL DEFAULT nextval('korisnik_SEQ'),
  CONSTRAINT korisnik_pk PRIMARY KEY (idKorisnik),
  CONSTRAINT korisnik_uloga FOREIGN KEY (idUloga) REFERENCES uloga(idUloga)
);

CREATE SEQUENCE trening_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE trening
(
  idTrening INT NOT NULL DEFAULT nextval('trening_SEQ'),
  dan VARCHAR(50) NOT NULL,
  vrijemePoc DATE NOT NULL,
  vrijemeZavr DATE NOT NULL,
  trajanje INT NOT NULL,
  valjanost DATE NOT NULL,
  CONSTRAINT trening_pk PRIMARY KEY (idTrening)
);

CREATE SEQUENCE obavijest_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE obavijest
(
  idObavijest INT NOT NULL DEFAULT nextval('obavijest_SEQ'),
  tekst VARCHAR(1000) NOT NULL,
  naslov VARCHAR(100) NOT NULL,
  CONSTRAINT obavijest_pk PRIMARY KEY (idObavijest)
);

CREATE SEQUENCE multimedija_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE multimedija
(
  idMulti INT NOT NULL DEFAULT nextval('multimedija_SEQ'),
  nazivMulti VARCHAR(100) NOT NULL,
  CONSTRAINT multimedija_pk PRIMARY KEY (idMulti)
);

CREATE SEQUENCE clanarina_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE clanarina
(
  iznos INT NOT NULL,
  datumUplate DATE NOT NULL,
  mjesec INT NOT NULL,
  godina INT NOT NULL,
  idClan INT NOT NULL DEFAULT nextval('clanarina_SEQ'),
  idKorisnik INT NOT NULL,
  CONSTRAINT clanarina_pk PRIMARY KEY (idClan, idKorisnik),
  CONSTRAINT clanarina_korisnik FOREIGN KEY (idKorisnik) REFERENCES korisnik(idKorisnik)
);

CREATE SEQUENCE aktivnost_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE aktivnost
(
  idAktivnost INT NOT NULL DEFAULT nextval('aktivnost_SEQ'),
  nazivAktivnost VARCHAR(50) NOT NULL,
  CONSTRAINT aktivnost_pk PRIMARY KEY (idAktivnost)
);

CREATE TABLE razina
(
  idRazina INT NOT NULL,
  nazivRazina VARCHAR(50) NOT NULL,
  CONSTRAINT razina_pk PRIMARY KEY (idRazina)
);

CREATE SEQUENCE praznik_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE praznik
(
  idPraznik INT NOT NULL DEFAULT nextval('praznik_SEQ'),
  datumPraznik DATE NOT NULL,
  CONSTRAINT praznik_pk PRIMARY KEY (idPraznik)
);

CREATE TABLE treningPraznici
(
  idPraznik INT NOT NULL,
  idTrening INT NOT NULL,
  CONSTRAINT treningPraznici_pk PRIMARY KEY (idPraznik, idTrening),
  CONSTRAINT praznik_fk FOREIGN KEY (idPraznik) REFERENCES praznik(idPraznik),
  CONSTRAINT trening_fk FOREIGN KEY (idTrening) REFERENCES trening(idTrening)
);

CREATE SEQUENCE grupa_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE grupa
(
  idGrupa INT NOT NULL DEFAULT nextval('grupa_SEQ'),
  nazivGrupa VARCHAR(50) NOT NULL,
  idRazina INT NOT NULL,
  idKorisnik INT NOT NULL,
  idAktivnost INT NOT NULL,
  idTrening INT NOT NULL,
  CONSTRAINT grupa_pk PRIMARY KEY (idGrupa),
  CONSTRAINT grupa_korisnik FOREIGN KEY (idKorisnik) REFERENCES korisnik(idKorisnik),
  CONSTRAINT grupa_aktivnost FOREIGN KEY (idAktivnost) REFERENCES aktivnost(idAktivnost),
  CONSTRAINT grupa_trening FOREIGN KEY (idTrening) REFERENCES trening(idTrening),
  CONSTRAINT grupa_razina FOREIGN KEY (idRazina) REFERENCES razina(idRazina)
);

CREATE TABLE ClanGrupa
(
  idKorisnik INT NOT NULL,
  idGrupa INT NOT NULL,
  CONSTRAINT ClanGrupa_pk PRIMARY KEY (idKorisnik, idGrupa),
  CONSTRAINT korisnik_fk FOREIGN KEY (idKorisnik) REFERENCES korisnik(idKorisnik),
  CONSTRAINT grupa_fk FOREIGN KEY (idGrupa) REFERENCES grupa(idGrupa)
);

insert into uloga
values (0, 'admin');
insert into uloga
values (1, 'clan');
insert into uloga
values (2, 'trener');

insert into razina
values (0, 'begginer');
insert into razina
values (1, 'intermediate');
insert into razina
values (2, 'advanced');

insert into aktivnost
values (0, 'Pole Flow');
insert into aktivnost
values (1, 'Pole Flow Dupli');
insert into aktivnost
values (2, 'Exotic Flow');
insert into aktivnost
values (3, 'Fleksibilnost');