'use client';

import { usePageState } from 'nrstate-client/PageStateClient';
import { PageStateDemo } from './PageStateDemo';

export default function E() {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a } = pageState;

  return (
    <>
      <div className="rounded p-5 outline-dashed">
        E<p>AdWords {a}</p>
      </div>
    </>
  );
}
