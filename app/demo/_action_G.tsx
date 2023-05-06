'use server';

export async function serverActionDBA({
  id,
  name,
  pos,
}: {
  id: string;
  name: string;
  pos: string;
}) {
  console.log(`serverActionDBA: id=${id}, name=${name}, pos=${pos}`);

  return `serverActionDBA: id=${id}, name=${name}, pos=${pos}`;
}

export async function serverActionEmpty() {}
