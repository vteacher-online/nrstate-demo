'use server';

import { sql } from '@vercel/postgres';
// import { revalidateTag } from 'next/cache';

export async function serverActionDBA({
  id,
  no,
  name,
  pos,
  tag,
}: {
  id: number;
  no: string;
  name: string;
  pos: string;
  tag: string;
}) {
  /*
  
  // Databese

  Ex.
  
  https://vercel.com/
  
  postgres
  
  DROP TABLE players;

  CREATE TABLE players
  (
    id integer not null,
    no text not null,
    name text not null,
    pos text not null,
    PRIMARY KEY(id)
  );

  TRUNCATE TABLE players;
  
  INSERT INTO players(id,no,name,pos) VALUES (1,'01', 'test 1' , 'pitcher');
  INSERT INTO players(id,no,name,pos) VALUES (2,'02', 'test 2' , 'outfielder');
  INSERT INTO players(id,no,name,pos) VALUES (3,'03', 'test 3' , 'pitcher');
  INSERT INTO players(id,no,name,pos) VALUES (4,'04', 'test 4' , 'catcher');
  INSERT INTO players(id,no,name,pos) VALUES (5,'05', 'test 5' , 'catcher');
  INSERT INTO players(id,no,name,pos) VALUES (6,'06', 'test 6' , 'infielder');
  INSERT INTO players(id,no,name,pos) VALUES (7,'07', 'test 7' , 'pitcher');
  INSERT INTO players(id,no,name,pos) VALUES (8,'08', 'test 8' , 'pitcher');
  INSERT INTO players(id,no,name,pos) VALUES (9,'09', 'test 9' , 'catcher');
  INSERT INTO players(id,no,name,pos) VALUES (10,'10', 'test 10' , 'catcher');

  */

  console.log(`serverActionDBA: id=${id} no=${no} name=${name} pos=${pos}`);

  // 推奨 ORM (Ex. Prisma)
  const result =
    await sql`UPDATE players SET no=${no}, name=${name}, pos=${pos} WHERE id=${id}`;

  console.log(result);

  // revalidateTag(tag);

  return '{status: 200}';
}
