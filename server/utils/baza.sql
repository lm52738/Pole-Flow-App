DROP TABLE IF EXISTS korisnik CASCADE;
DROP SEQUENCE IF EXISTS korisnik_SEQ CASCADE;

DROP TABLE IF EXISTS opcije CASCADE;
DROP SEQUENCE IF EXISTS opcije_SEQ CASCADE;

DROP TABLE IF EXISTS trening CASCADE;
DROP SEQUENCE IF EXISTS trening_SEQ CASCADE;

DROP TABLE IF EXISTS termin CASCADE;
DROP SEQUENCE IF EXISTS termin_SEQ CASCADE;

DROP TABLE IF EXISTS obavijest CASCADE;
DROP SEQUENCE IF EXISTS obavijest_SEQ CASCADE;

DROP TABLE IF EXISTS multimedija CASCADE;
DROP SEQUENCE IF EXISTS multimedija_SEQ CASCADE;

DROP TABLE IF EXISTS clanarina CASCADE;
DROP SEQUENCE IF EXISTS clanarina_SEQ CASCADE;

DROP TABLE IF EXISTS grupa CASCADE;
DROP SEQUENCE IF EXISTS grupa_SEQ CASCADE;

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
  registracija DATE NOT NULL,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(50) NOT NULL,
  datumRod DATE NOT NULL,
  mail VARCHAR(150) NOT NULL UNIQUE,
  brMob CHAR(10) NOT NULL,
  idUloga INT NOT NULL,
  brNadoknada INT,
  lozinka VARCHAR(200) NOT NULL,
  idKorisnik INT NOT NULL DEFAULT nextval('korisnik_SEQ'),
  CONSTRAINT korisnik_pk PRIMARY KEY (idKorisnik),
  CONSTRAINT korisnik_uloga FOREIGN KEY (idUloga) REFERENCES uloga(idUloga)
);

CREATE SEQUENCE opcije_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE opcije
(
  idOpcije INT NOT NULL DEFAULT nextval('korisnik_SEQ'),
  idKorisnik INT NOT NULL,
  opcije VARCHAR(300) NOT NULL,
  CONSTRAINT opcije_pk PRIMARY KEY (idOpcije),
  CONSTRAINT korisnik_opcije FOREIGN KEY (idKorisnik) REFERENCES korisnik(idKorisnik) ON DELETE CASCADE
);

CREATE SEQUENCE termin_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE termin
(
  idTermin INT NOT NULL DEFAULT nextval('termin_SEQ'),
  dan VARCHAR(50) NOT NULL,
  vrijemePoc TIME NOT NULL,
  vrijemeZavr TIME NOT NULL,
  valjanost DATE NOT NULL,
  CONSTRAINT termin_pk PRIMARY KEY (idTermin)
);

CREATE SEQUENCE obavijest_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE obavijest
(
  idObavijest INT NOT NULL DEFAULT nextval('obavijest_SEQ'),
  tekst VARCHAR(500) NOT NULL,
  naslov VARCHAR(50) NOT NULL,
  datumIsteka TIMESTAMP NOT NULL,
  CONSTRAINT obavijest_pk PRIMARY KEY (idObavijest)
);

CREATE SEQUENCE multimedija_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE multimedija
(
  idMulti INT NOT NULL DEFAULT nextval('multimedija_SEQ'),
  nazivMulti VARCHAR(50) NOT NULL,
  uri VARCHAR(200) NOT NULL UNIQUE,
  CONSTRAINT multimedija_pk PRIMARY KEY (idMulti)
);

CREATE SEQUENCE clanarina_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE clanarina
(
  iznos INT NOT NULL,
  datumUplate DATE,
  mjesec INT NOT NULL,
  godina INT NOT NULL,
  idClan INT NOT NULL DEFAULT nextval('clanarina_SEQ'),
  idKorisnik INT NOT NULL,
  CONSTRAINT clanarina_pk PRIMARY KEY (idClan, idKorisnik),
  CONSTRAINT clanarina_korisnik FOREIGN KEY (idKorisnik) REFERENCES korisnik(idKorisnik) ON DELETE CASCADE
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

CREATE SEQUENCE trening_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE trening
(
  idTrening INT NOT NULL DEFAULT nextval('trening_SEQ'),
  dolaznost INT,
  odaziv INT[],
  datum DATE NOT NULL,
  idTermin INT NOT NULL,
  CONSTRAINT trening_pk PRIMARY KEY (idTrening),
  CONSTRAINT trening_termin FOREIGN KEY (idTermin) REFERENCES termin(idTermin) ON DELETE CASCADE
);

CREATE SEQUENCE grupa_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE grupa
(
  idGrupa INT NOT NULL DEFAULT nextval('grupa_SEQ'),
  nazivGrupa VARCHAR(50) NOT NULL,
  idRazina INT NOT NULL,
  idTrener INT NOT NULL,
  idAktivnost INT NOT NULL,
  idTermin INT NOT NULL,
  CONSTRAINT grupa_pk PRIMARY KEY (idGrupa),
  CONSTRAINT grupa_korisnik FOREIGN KEY (idTrener) REFERENCES korisnik(idKorisnik) ON DELETE CASCADE,
  CONSTRAINT grupa_aktivnost FOREIGN KEY (idAktivnost) REFERENCES aktivnost(idAktivnost),
  CONSTRAINT grupa_trening FOREIGN KEY (idTermin) REFERENCES termin(idTermin) ON DELETE CASCADE,
  CONSTRAINT grupa_razina FOREIGN KEY (idRazina) REFERENCES razina(idRazina)
);

CREATE TABLE ClanGrupa
(
  idKorisnik INT NOT NULL,
  idGrupa INT NOT NULL,
  CONSTRAINT ClanGrupa_pk PRIMARY KEY (idKorisnik, idGrupa),
  CONSTRAINT korisnik_fk FOREIGN KEY (idKorisnik) REFERENCES korisnik(idKorisnik) ON DELETE CASCADE,
  CONSTRAINT grupa_fk FOREIGN KEY (idGrupa) REFERENCES grupa(idGrupa) ON DELETE CASCADE
);

insert into uloga
values (0, 'Admin');
insert into uloga
values (1, 'Član Kluba');
insert into uloga
values (2, 'Trener');

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

insert into korisnik
values ('17/04/2022','Marta', 'Špoljarić', '17/12/1998','poleflow@gmail.com',0915677834,0,0,'$2a$12$/s02RNWjph20TcjC7wMcruXFXsjb90Mkhq7TCFqZApDI.SELkDYXO');

CREATE FUNCTION daterange(x date, y date, dan integer)
RETURNS TABLE (date_range date) AS
$$
BEGIN
	RAISE NOTICE '%', dan;
	RETURN QUERY (SELECT dd::date from generate_series(x::date,y::date,'1 day'::interval) dd  where extract(DOW from dd) = dan);
END;
$$LANGUAGE plpgsql;


CREATE FUNCTION dayofweek(id integer)
RETURNS int AS
$$
Declare  
 day integer;  
BEGIN
	SELECT CASE dan INTO day WHEN 'ponedjeljak' THEN 1
										   WHEN 'utorak' THEN 2
										   WHEN 'srijeda' THEN 3
										   WHEN 'četvrtak' THEN 4
										   WHEN 'petak' THEN 5
										   WHEN 'subota' THEN 6
										   WHEN 'nedjelja' THEN 0
										  END
										  FROM termin
										  WHERE idTermin = id;
	RAISE NOTICE '%', day;
	return day;
END;
$$LANGUAGE plpgsql;



CREATE FUNCTION create_termin() RETURNS trigger AS $create_termin$
    
	DECLARE
	datum date;
	BEGIN
        IF (SELECT COUNT(*) FROM trening WHERE idTermin = NEW.idTermin) = 0 THEN
		
			FOR datum IN (SELECT daterange((current_date::date),(current_date + '1 year'::interval)::date,dayofweek(NEW.idtermin)))
				LOOP
				INSERT INTO trening (datum,idtermin) VALUES (datum, NEW.idtermin);
				END LOOP;
		END IF;
		RETURN NEW;
    END;
	
$create_termin$ LANGUAGE plpgsql;

CREATE TRIGGER clanarina AFTER INSERT ON termin
    FOR EACH ROW EXECUTE FUNCTION create_termin();

CREATE FUNCTION update_termin() RETURNS trigger AS $update_termin$
    
	DECLARE
	datum date;
	BEGIN
        IF (SELECT COUNT(*) FROM trening WHERE idTermin = NEW.idTermin) = 0 THEN
		
			FOR datum IN (SELECT daterange((current_date::date),(current_date + '1 year'::interval)::date,dayofweek(NEW.idtermin)))
				LOOP
        UPDATE trening SET trening.datum = datum WHERE idtermin = NEW.idtermin;
				END LOOP;
		END IF;
		RETURN NEW;
    END;
	
$update_termin$ LANGUAGE plpgsql;

CREATE TRIGGER clanarina AFTER UPDATE ON termin
    FOR EACH ROW EXECUTE FUNCTION update_termin();

CREATE FUNCTION monthrange()
RETURNS TABLE (date_range date) AS
$$
BEGIN
	RETURN QUERY (SELECT dd::date from generate_series((current_date::date),(current_date + '1 year'::interval)::date,'1 month') dd);
END;
$$LANGUAGE plpgsql;

CREATE FUNCTION create_clanarina() RETURNS trigger AS $create_clanarina$
    
	DECLARE
	datum date;
	BEGIN
        IF (SELECT COUNT(*) FROM clanarina WHERE idkorisnik = NEW.idkorisnik) = 0 THEN
			FOR datum IN (SELECT monthrange())
				LOOP
				INSERT INTO clanarina (iznos,mjesec,godina,idkorisnik) VALUES (200,EXTRACT(MONTH FROM datum),EXTRACT(YEAR FROM datum),NEW.idkorisnik);
				END LOOP;
		END IF;
		RETURN NEW;
    END;
	
$create_clanarina$ LANGUAGE plpgsql;

CREATE TRIGGER clanarina AFTER INSERT ON korisnik
    FOR EACH ROW EXECUTE FUNCTION create_clanarina();