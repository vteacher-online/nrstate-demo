'use client';

import { useState } from 'react';
import { usePageState } from 'nrstate-client/PageStateClient';
import { PageStateDemo, pathDemo } from './PageStateDemo';

export default function A() {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a } = pageState;
  const [_a, set_A] = useState(a); // Local state

  return (
    <div className="w-full rounded p-5 outline-dashed">
      <p>A</p>
      <input
        className="w-full rounded border-gray-200 sm:w-11/12"
        type="text"
        defaultValue={a}
        onChange={(e) => {
          set_A(e.target.value);
        }}
      />
      <button
        className="w-fit rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700 sm:w-1/12 "
        onClick={() => {
          setPageState(
            {
              ...pageState,
              a: _a,
            },
            pathDemo,
          );
        }}
      >
        Filter
      </button>
    </div>
  );
}
