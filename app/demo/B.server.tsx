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

export default async function B() {
  const appState = getPageState<PageStateDemo>(initialPageStateDemo, pathDemo);
  const { a, d } = appState;

  // {
  //   // test
  //   const sleep = (time: number) =>
  //     new Promise((resolve) => setTimeout(resolve, time));
  //   await sleep(1000);
  // }

  // 推奨 ORM (Ex. Prisma)
  const rows = await queryB(a, d);

  console.log(rows);

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
