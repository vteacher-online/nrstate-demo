import { Suspense } from 'react';

import { currentPageState } from 'nrstate/PageStateServer';
import PageStateProvider from 'nrstate-client/PageStateProvider';
import { PageStateDemo, initialPageStateDemo, pathDemo } from './PageStateDemo';

import A from './A';
import B from './B.client';
import B_server from './B.server';
import C from './C';
import D from './D';
import E from './E';

import getTrademark from './_trademark';

export default async function Page() {
  const current = currentPageState<PageStateDemo>(
    initialPageStateDemo,
    pathDemo,
  );
  const { a } = current;

  const trademark = getTrademark(a);

  const adWords = await getAdWords(a);

  return (
    <>
      <PageStateProvider current={current}>
        <div className="p-5">
          <div className="float-left w-1/4 rounded p-5 outline-dashed">
            <C />
            <E adWords={adWords} trademark={trademark} />
          </div>
          <div className="float-right w-3/4 rounded p-5 outline-dashed">
            <div className="rounded p-5 outline-dashed">
              <A />
              <D />
            </div>
            <B>
              <Suspense fallback={<div>⏳</div>}>
                {/* @ts-expect-error Async Server Component */}
                <B_server />
              </Suspense>
            </B>
          </div>
        </div>
      </PageStateProvider>
    </>
  );
}

async function getAdWords(a: string) {
  // {
  //   // test
  //   const sleep = (time: number) =>
  //     new Promise((resolve) => setTimeout(resolve, time));
  //   await sleep(1000);
  // }

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
  const _examples = json.filter((data: { word: string; ad: string }) => {
    return data.word.includes(a) || data.ad.includes(a);
  });

  const examples = Array.from(
    new Map(
      _examples.map((data: { id: string; word: string; ad: string }) => [
        data.ad,
        { id: data.id, pos: data.ad },
      ]),
    ).values(),
  );

  return examples;
}
