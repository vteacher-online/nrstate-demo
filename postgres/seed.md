# Vercel Postgres

- Vercel Postgres  
  https://vercel.com/docs/storage/vercel-postgres

## Run the seed script.

```sql
DROP TABLE players;
```

```sql
CREATE TABLE players
(
  id integer not null,
  no text not null,
  name text not null,
  pos text not null,
  PRIMARY KEY(id)
);
```

```sql
TRUNCATE TABLE players;
```

```sql
INSERT INTO players(id, no, name, pos) VALUES ( 11, '11', 'Yu Darvish', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 12, '12', 'Shosei Togo', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 13, '13', 'Yuki Matsui', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 14, '14', 'Roki Sasaki', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 15, '15', 'Taisei Ota', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 16, '16', 'Shohei Ohtani', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 17, '17', 'Hiromi Itoh', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 18, '18', 'Yoshinobu Yamamoto', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 20, '20', 'Ryoji Kuribayashi', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 21, '21', 'Shota Imanaga', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 22, '22', 'Atsuki Yuasa', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 26, '26', 'Yuki Udagawa', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 28, '28', 'Hiroto Takahashi', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 29, '29', 'Hiroya Miyagi', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 47, '47', 'Keiji Takahashi', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 63, '63', 'Soichiro Yamazaki', 'pitcher');
INSERT INTO players(id, no, name, pos) VALUES ( 10, '10', 'Takuya Kai', 'catcher');
INSERT INTO players(id, no, name, pos) VALUES ( 24, '24', 'Takumi Ohshiro', 'catcher');
INSERT INTO players(id, no, name, pos) VALUES ( 27, '27', 'Yuhei Nakamura', 'catcher');
INSERT INTO players(id, no, name, pos) VALUES ( 1, '01', 'Tetsuto Yamada', 'infielder');
INSERT INTO players(id, no, name, pos) VALUES ( 2, '02', 'Sosuke Genda', 'infielder');
INSERT INTO players(id, no, name, pos) VALUES ( 3, '03', 'Shugo Maki', 'infielder');
INSERT INTO players(id, no, name, pos) VALUES ( 5, '05', 'Taisei Makihara', 'infielder');
INSERT INTO players(id, no, name, pos) VALUES ( 7, '07', 'Takumu Nakano', 'infielder');
INSERT INTO players(id, no, name, pos) VALUES ( 25, '25', 'Kazuma Okamoto', 'infielder');
INSERT INTO players(id, no, name, pos) VALUES ( 33, '33', 'Hotaka Yamakawa', 'infielder');
INSERT INTO players(id, no, name, pos) VALUES ( 55, '55', 'Munetaka Murakami', 'infielder');
INSERT INTO players(id, no, name, pos) VALUES ( 8, '08', 'Kensuke Kondo', 'outfielder');
INSERT INTO players(id, no, name, pos) VALUES ( 9, '09', 'Ukyo Shuto', 'outfielder');
INSERT INTO players(id, no, name, pos) VALUES ( 23, '23', 'Lars Nootbaar', 'outfielder');
INSERT INTO players(id, no, name, pos) VALUES ( 34, '34', 'Masataka Yoshida', 'outfielder');
```
