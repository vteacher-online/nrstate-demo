import { getPageState } from 'nrstate/PageStateServer';
import { PageStateDemo, initialPageStateDemo, pathDemo } from './PageStateDemo';
import getTrademark from './libs/trademark';
import getAdWords from './libs/adwords';

export default async function E() {
  const appState = getPageState<PageStateDemo>(initialPageStateDemo, pathDemo);
  const { a } = appState;

  const trademark = getTrademark(a);
  const adWords = await getAdWords(a);

  return (
    <>
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
    </>
  );
}
