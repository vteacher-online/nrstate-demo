import { Suspense } from 'react';
import { getPageState } from 'nrstate/PageStateServer';
import { PageStateDemo, initialPageStateDemo, pathDemo } from './PageStateDemo';

import F_server from './F.server';

import G from './G';
import { serverActionDBA, serverActionEmpty } from './_action_G';

import H from './H';
import {
  serverActionValidationResult,
  serverActionDBAWithFormData,
} from './_action_H';

export default async function B() {
  const appState = getPageState<PageStateDemo>(initialPageStateDemo, pathDemo);
  const { a, d } = appState;

  // {
  //   // test
  //   const sleep = (time: number) =>
  //     new Promise((resolve) => setTimeout(resolve, time));
  //   await sleep(1000);
  // }

  const result = await fetch(
    `${
      process.env.NEXT_PUBLIC_API
        ? process.env.NEXT_PUBLIC_API
        : 'http://localhost:3000'
    }/api/examples`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 5 },
    },
  );

  const json = await result.json();

  console.log(`B ServerComponent a=${a} d=${d}`);

  const examples = json
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

  return (
    <ul className="list-disc">
      {examples.map(
        ({ id, name, pos }: { id: string; name: string; pos: string }) => (
          <li key={id} className="m-5">
            <Suspense fallback={<div>⏳</div>}>
              {/* @ts-expect-error Async Server Component */}
              <F_server id={id} name={name} pos={pos} />
            </Suspense>
            {/* @ts-expect-error Async Server Component */}
            <form action={serverActionEmpty}>
              <G
                id={id}
                name={name}
                pos={pos}
                serverActionDBA={serverActionDBA}
              />
            </form>
            {/* @ts-expect-error Async Server Component */}
            <form action={serverActionDBAWithFormData}>
              <input type="text" name="id" defaultValue={id} />
              <input type="text" name="name" defaultValue={name} />
              <input type="text" name="pos" defaultValue={pos} />
              <H serverActionValidationResult={serverActionValidationResult} />
            </form>
          </li>
        ),
      )}
    </ul>
  );
}
