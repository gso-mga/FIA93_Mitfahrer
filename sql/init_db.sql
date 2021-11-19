create user 'mitfahrer'@'localhost'
identified with mysql_native_password by 'password';
GRANT ALL PRIVILEGES ON * . * TO 'mitfahrer'@'localhost';
flush privileges;

create schema mitfahrer_app;

CREATE TABLE mitfahrer_app.`benutzer` (
  `id` int(10) NOT NULL,
  `email` varchar(64) NOT NULL,
  `passwort` varchar(64) NOT NULL,
  `vorname` varchar(32) NOT NULL,
  `nachname` varchar(32) DEFAULT NULL,
  `geburtsdatum` date NOT NULL,
  `strasse` varchar(64) NOT NULL,
  `plz` varchar(64) NOT NULL,
  `ort` varchar(64) NOT NULL,
  `geschlecht` varchar(8) DEFAULT NULL,
  `profilbild` blob,
  `erstellt` datetime NOT NULL
) ;

CREATE TABLE mitfahrer_app.`benutzer_sichtbarkeit` (
  `id` int(10) NOT NULL,
  `benutzer_id` int(10) DEFAULT NULL,
  `geschlecht` tinyint(4) DEFAULT NULL,
  `nachname` tinyint(4) DEFAULT NULL,
  `profilbild` tinyint(4) DEFAULT NULL
) ;


CREATE TABLE mitfahrer_app.`fahrer` (
  `id` int(10) NOT NULL,
  `benutzer_id` int(10) NOT NULL,
  `fuehrerschein` blob,
  `verifizierungsstatus` tinyint(4) DEFAULT NULL,
  `fahrzeug_id` int(10) DEFAULT NULL
) ;


CREATE TABLE mitfahrer_app.`fahrten` (
  `id` int(10) NOT NULL,
  `ort` varchar(64) NOT NULL,
  `start` datetime NOT NULL,
  `dauer` int(10) NOT NULL,
  `fahrer_id` int(10) NOT NULL
) ;


CREATE TABLE mitfahrer_app.`fahrzeug` (
  `id` int(10) NOT NULL,
  `plaetze` varchar(64) NOT NULL,
  `modell` varchar(64) NOT NULL,
  `farbe` varchar(64) NOT NULL,
  `kennzeichen` varchar(64) NOT NULL
) ;
alter table mitfahrer_app.fahrzeug
add column benutzer_id int(10);

CREATE TABLE mitfahrer_app.`mitfahrer` (
  `id` int(10) NOT NULL,
  `benutzer_id` int(10) NOT NULL,
  `fahrt_id` int(10) NOT NULL,
  `abholpunkt` varchar(64) NOT NULL
) ;

ALTER TABLE mitfahrer_app.`benutzer`
  ADD PRIMARY KEY (`id`);


ALTER TABLE mitfahrer_app.`benutzer_sichtbarkeit`
  ADD PRIMARY KEY (`id`);


ALTER TABLE mitfahrer_app.`fahrer`
  ADD PRIMARY KEY (`id`);


ALTER TABLE mitfahrer_app.`fahrten`
  ADD PRIMARY KEY (`id`);


ALTER TABLE mitfahrer_app.`fahrzeug`
  ADD PRIMARY KEY (`id`);


ALTER TABLE mitfahrer_app.`mitfahrer`
  ADD PRIMARY KEY (`id`);

ALTER TABLE mitfahrer_app.`benutzer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE mitfahrer_app.`benutzer_sichtbarkeit`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE mitfahrer_app.`fahrer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE mitfahrer_app.`fahrten`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE mitfahrer_app.`fahrzeug`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE mitfahrer_app.`mitfahrer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

alter table mitfahrer_app.benutzer_sichtbarkeit
add constraint
foreign key fk_sichtbarkeit_benutzer (benutzer_id) references mitfahrer_app.benutzer (id);

alter table mitfahrer_app.fahrer
add constraint
foreign key fk_benutzer_fahrer (benutzer_id) references mitfahrer_app.benutzer (id);

alter table mitfahrer_app.fahrten
add constraint
foreign key fk_fahrten_fahrten (fahrer_id) references mitfahrer_app.fahrer (id);

alter table mitfahrer_app.mitfahrer
add constraint
foreign key fk_mitfahrer_benutzer (benutzer_id) references mitfahrer_app.benutzer (id);

COMMIT;
