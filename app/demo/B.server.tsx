import { Suspense } from 'react';
import { getPageState } from 'nrstate/PageStateServer';
import { PageStateDemo, initialPageStateDemo, pathDemo } from './PageStateDemo';

import F_server from './F.server';

export default async function B() {
  const appState = getPageState<PageStateDemo>(initialPageStateDemo, pathDemo);
  const { a, d } = appState;

  // {
  //   // test
  //   const sleep = (time: number) =>
  //     new Promise((resolve) => setTimeout(resolve, time));
  //   await sleep(1000);
  // }

  const result = await fetch('http://localhost:3000/api/examples', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 5 },
  });

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
            {id} : {name} ({pos})
            <Suspense fallback={<div>⏳</div>}>
              {/* @ts-expect-error Async Server Component */}
              <F_server id={id} name={name} pos={pos} />
            </Suspense>
          </li>
        ),
      )}
    </ul>
  );
}
