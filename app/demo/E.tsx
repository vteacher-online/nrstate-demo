'use client';

import { usePageState } from 'nrstate-client/PageStateClient';
import { PageStateDemo } from './PageStateDemo';

import getTrademark from './_trademark';

export default function E({ adWords }: { adWords: any }) {
  const [pageState, setPageState] = usePageState<PageStateDemo>();
  const { a } = pageState;

  const trademark = getTrademark(a);

  return (
    <>
      <div className="rounded p-5 outline-dashed">
        E<p>AdWords (a={a})</p>
        <ul className="list-disc">
          {adWords.map((example: any) => (
            <li key={example.id} className="m-5">
              <a
                href={`https://www.google.com/search?q=baseball+${example.pos}&tbm=shop`}
                target={`_blank`}
                className="text-blue-700"
              >
                {example.pos}
              </a>
            </li>
          ))}
        </ul>
        <p>Trademark</p>
        <p>{trademark}</p>
      </div>
    </>
  );
}
