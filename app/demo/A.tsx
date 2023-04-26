'use client';

import { startTransition, useState } from 'react';
import { usePageState } from 'nrstate-client/PageStateClient';
import { PageStateDemo, pathDemo } from './PageStateDemo';

export default function A() {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a } = pageState;
  const [_a, set_A] = useState(''); // Local state

  return (
    <div className="w-full rounded p-5 outline-dashed">
      <p>A</p>
      <input
        className="w-11/12 rounded border-gray-200"
        type="text"
        defaultValue={a}
        onChange={(e) => {
          set_A(e.target.value);
        }}
      />
      <button
        className="w-1/12 rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700 "
        onClick={() => {
          startTransition(() => {
            setPageState(
              {
                ...pageState,
                a: _a,
              },
              pathDemo,
            );
          });
        }}
      >
        Filter
      </button>
    </div>
  );
}
