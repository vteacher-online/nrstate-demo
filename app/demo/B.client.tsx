'use client';

import { useTransition } from 'react';
import { PageStateDemo, pathDemo } from './PageStateDemo';
import { usePageState } from 'nrstate-client/PageStateClient';

export default function B({ children }: { children: React.ReactNode }) {
  const [, startTransition] = useTransition();
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a, d } = pageState;

  async function handleCreate() {
    const payload = { hoge: 'hoge', fuga: 'fuga' };
    const method = 'POST';
    const response = await fetch('http://localhost:3000/api/examples', {
      method,
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      startTransition(() => {
        setPageState(
          {
            ...pageState,
          },
          pathDemo,
        );
      });
    }
  }

  return (
    <div className="min-h-screen rounded p-5 outline-dashed">
      B (a={a}, d={d})<div>{children}</div>
      <button
        className="rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700 "
        onClick={() => {
          handleCreate();
        }}
      >
        Mutate
      </button>
    </div>
  );
}
