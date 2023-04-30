'use client';

import { useEffect, useState } from 'react';

export default function F({
  id,
  name,
  pos,
}: {
  id: string;
  name: string;
  pos: string;
}) {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    const init = async () => {
      const key = `${id}:${name}:${pos}`;
      const result = await fetch(
        `https://vteacher.online/v/nrstate/demo/json/?${key}`,
        {
          mode: 'cors',
        },
      );

      const json = await result.json();
      const { uuid } = json;

      setUuid(uuid);
    };
    init();
  }, []);

  return (
    <>
      <p className="text-xs text-slate-400">{uuid}</p>
    </>
  );
}
