'use server';

import { sql } from '@vercel/postgres';

export async function serverActionDBA({
  id,
  name,
  pos,
}: {
  id: string;
  name: string;
  pos: string;
}) {
  /*
  // Databese

  Ex.
  
  https://vercel.com/
  
  postgres
  
  CREATE TABLE players
  (
    id char(4) not null,
    no text not null,
    name text not null,
    pos text not null,
    PRIMARY KEY(id)
  );

  TRUNCATE TABLE players;
  
  INSERT INTO players(id,no,name,pos) VALUES (1,'01', 'test 1' , 'pitcher');
  INSERT INTO players(id,no,name,pos) VALUES (2,'02', 'test 2' , 'pitcher');
  INSERT INTO players(id,no,name,pos) VALUES (3,'03', 'test 3' , 'pitcher');
  INSERT INTO players(id,no,name,pos) VALUES (4,'04', 'test 4' , 'catcher');
  INSERT INTO players(id,no,name,pos) VALUES (5,'05', 'test 5' , 'catcher');
  
  */

  console.log(`serverActionDBA: id=${id} name=${name} pos=${pos}`);

  // 推奨 Prisma / ? / ?
  const { rows } = await sql`
  SELECT * FROM players;
  `;

  console.log(rows);

  return '{status: 200}';
}
