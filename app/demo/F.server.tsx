export default async function F({
  id,
  name,
  pos,
}: {
  id: string;
  name: string;
  pos: string;
}) {
  const key = `${id}:${name}:${pos}`;

  const result = await fetch(
    `https://vteacher.online/v/nrstate/demo/json/?${key}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 5 },
    },
  );

  const json = await result.json();
  const { uuid } = json;

  return (
    <>
      <p className="text-xs text-slate-400">{uuid}</p>
    </>
  );
}
