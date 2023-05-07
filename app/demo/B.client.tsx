'use client';

import { PageStateDemo } from './PageStateDemo';
import { usePageState } from 'nrstate-client/PageStateClient';

export default function B({ children }: { children: React.ReactNode }) {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a, d } = pageState;

  return (
    <div className="min-h-screen rounded p-5 outline-dashed">
      B (a={a}, d={d})<div>{children}</div>
    </div>
  );
}
