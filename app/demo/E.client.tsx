'use client';

import { usePageState } from 'nrstate-client/PageStateClient';
import { PageStateDemo } from './PageStateDemo';

export default function E({ children }: { children: React.ReactNode }) {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a } = pageState;

  return (
    <>
      <div className="rounded p-5 outline-dashed">
        E<p>AdWords (a={a})</p>
        <div>{children}</div>
      </div>
    </>
  );
}
