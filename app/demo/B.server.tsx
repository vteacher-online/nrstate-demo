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

  async function create(formData: FormData) {
    'use server';

    console.log(formData);
  }

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
            <form action={create}>
              <input type="text" name="id" defaultValue={id} />
              <input type="text" name="name" defaultValue={name} />
              <input type="text" name="pos" defaultValue={pos} />
              <button
                type="submit"
                className="w-1/12 rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700 "
              >
                Mutate
              </button>
            </form>
          </li>
        ),
      )}
    </ul>
  );
}
