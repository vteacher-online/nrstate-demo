'use client';

import { usePageState } from 'nrstate-client/PageStateClient';
import { PageStateIndex, pathIndex } from './PageStateIndex';

export default function Menu() {
  const [pageState, setPageState] = usePageState<PageStateIndex>();
  const { menuId, url } = pageState;

  // clearPageState(pathDemo);

  const menus = [
    {
      id: 0,
      url: 'http://localhost:3000/demo',
      title: 'Show demo',
    },
    {
      id: 1,
      url: 'https://www.npmjs.com/package/nrstate',
      title: 'npm install nrstate',
    },
    {
      id: 2,
      url: 'https://www.npmjs.com/package/nrstate-client',
      title: 'npm install nrstate-client',
    },
  ];

  return (
    <>
      <div className="m-5 w-fit rounded p-5 outline-dashed">
        <ul>
          {menus.map(
            ({
              id,
              url,
              title,
            }: {
              id: number;
              url: string;
              title: string;
            }) => {
              return (
                <li key={id}>
                  {menuId === id ? <span>🟢</span> : <span>🟤</span>}
                  <button
                    onClick={() => {
                      setPageState(
                        {
                          ...pageState,
                          menuId: id,
                          url: url,
                        },
                        pathIndex,
                      );
                    }}
                  >
                    {title}
                  </button>
                </li>
              );
            },
          )}
        </ul>
      </div>
      <div className="m-5 w-fit p-5">
        {url ? (
          <p>
            <a className="text-blue-700" href={url}>
              {url}
            </a>
          </p>
        ) : null}
      </div>
    </>
  );
}
