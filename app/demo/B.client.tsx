'use client';

import { useEffect, useState } from 'react';
import { PageStateDemo } from './PageStateDemo';
import { usePageState } from 'nrstate-client/PageStateClient';

import F from './F.client';

export default function B() {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a, d } = pageState;

  const [examples, setExamples] = useState([]);

  useEffect(() => {
    const init = async () => {
      const result = await fetch(`http://localhost:3000/api/examples`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 5 },
      });

      const json = await result.json();

      console.log(`B ClientComponent a=${a} d=${d}`);

      const _examples = json
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

      setExamples(_examples);
    };
    init();
  }, []);

  return (
    <div className="min-h-screen rounded p-5 outline-dashed">
      B (a={a}, d={d})
      <div>
        <ul className="list-disc">
          {examples.map(
            ({ id, name, pos }: { id: string; name: string; pos: string }) => (
              <li key={id} className="m-5">
                {id} : {name} ({pos})
                <F id={id} name={name} pos={pos} />
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
