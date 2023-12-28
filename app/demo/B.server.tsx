import { Suspense } from 'react';
import { getPageState } from 'nrstate/PageStateServer';
import { PageStateDemo, initialPageStateDemo, pathDemo } from './PageStateDemo';

import F_server from './F';
import G from './G';

import { serverActionDBA } from './server-actions/serverActionG';
import { sql, QueryResultRow } from '@vercel/postgres';

async function queryB(a: string, d: string) {
  const likeCondition = `%${a}%`;

  if (d === 'desc') {
    const {
      rows,
    }: {
      rows: QueryResultRow &
        {
          id: number;
          no: string;
          name: string;
          pos: string;
        }[];
    } =
      await sql`SELECT * FROM players WHERE no ILIKE ${likeCondition} OR name ILIKE ${likeCondition} OR pos ILIKE ${likeCondition} ORDER BY no desc;`;
    return rows;
  } else {
    const {
      rows,
    }: {
      rows: QueryResultRow &
        {
          id: number;
          no: string;
          name: string;
          pos: string;
        }[];
    } =
      await sql`SELECT * FROM players WHERE no ILIKE ${likeCondition} OR name ILIKE ${likeCondition} OR pos ILIKE ${likeCondition} ORDER BY no asc;`;
    return rows;
  }
}

async function apiB(a: string, d: string) {
  const result = await fetch(
    `${
      process.env.NEXT_PUBLIC_API
        ? process.env.NEXT_PUBLIC_API
        : 'http://localhost:3000'
    }/api/players`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 5 },
    },
  );

  const json = await result.json();

  const players = json
    .filter((data: { name: string; pos: string }) => {
      return data.name.includes(a) || data.pos.includes(a);
    })
    .sort((value: { id: string }, target: { id: string }) => {
      if (d == 'asc') {
        return value.id < target.id ? -1 : 1;
      } else {
        return value.id > target.id ? -1 : 1;
      }
    });

  return players;
}

export default async function B() {
  const pageState = getPageState<PageStateDemo>(initialPageStateDemo, pathDemo);
  const { a, d } = pageState;

  // {
  //   // test
  //   const sleep = (time: number) =>
  //     new Promise((resolve) => setTimeout(resolve, time));
  //   await sleep(1000);
  // }

  let rows: QueryResultRow &
    {
      id: number;
      no: string;
      name: string;
      pos: string;
    }[] = [];
  if (process.env.NEXT_PUBLIC_POSTGRES === 'true') {
    // ORM (Ex. Prisma)
    rows = await queryB(a, d);
  } else {
    rows = await apiB(a, d);
  }

  return (
    <ul className="list-disc">
      {rows.map(({ id, no, name, pos }) => (
        <li key={id} className="m-5">
          <G
            id={id}
            no={no}
            name={name}
            pos={pos}
            serverActionDBA={serverActionDBA}
          />
          <Suspense fallback={<div>⏳</div>}>
            {/* @ts-expect-error Async Server Component */}
            <F_server id={id} name={name} pos={pos} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}
