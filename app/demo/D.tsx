'use client';

import { startTransition } from 'react';
import { usePageState } from './nrstate-client/PageStateClient';
import { PageStateDemo, pathDemo } from './PageStateDemo';

export default function D() {
  const [appState, setAppState] = usePageState<PageStateDemo>();
  const { d } = appState;

  return (
    <div className="rounded p-5 outline-dashed">
      D
      <select
        className="w-full rounded border-gray-200"
        defaultValue={d}
        onChange={(e) => {
          startTransition(() => {
            setAppState(
              {
                ...appState,
                d: e.target.value,
              },
              pathDemo,
            );
          });
        }}
      >
        <option>asc</option>
        <option>desc</option>
      </select>
    </div>
  );
}
