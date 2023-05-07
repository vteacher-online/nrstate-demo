import { Suspense } from 'react';
import { getPageState } from 'nrstate/PageStateServer';
import { PageStateDemo, initialPageStateDemo, pathDemo } from './PageStateDemo';

import F_server from './F.server';

import G from './G';
import {
  serverActionDBA,
  serverActionEmpty,
} from './server-actions/serverActionG';

import { QueryResultRow, sql } from '@vercel/postgres';

export default async function B() {
  const appState = getPageState<PageStateDemo>(initialPageStateDemo, pathDemo);
  const { a, d } = appState;

  // {
  //   // test
  //   const sleep = (time: number) =>
  //     new Promise((resolve) => setTimeout(resolve, time));
  //   await sleep(1000);
  // }

  // 推奨 Prisma / ? / ?
  const {
    rows,
  }: {
    rows: QueryResultRow &
      {
        id: string;
        no: string;
        name: string;
        pos: string;
      }[];
  } = await sql`
  SELECT * FROM players;
  `;

  console.log(rows);

  return (
    <ul className="list-disc">
      {rows.map(({ id, name, pos }) => (
        <li key={id} className="m-5">
          {/* @ts-expect-error Async Server Component */}
          <form action={serverActionEmpty}>
            <G
              id={id}
              name={name}
              pos={pos}
              serverActionDBA={serverActionDBA}
            />
          </form>
          <Suspense fallback={<div>⏳</div>}>
            {/* @ts-expect-error Async Server Component */}
            <F_server id={id} name={name} pos={pos} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}
