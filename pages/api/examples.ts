import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const delay = searchParams.get('delay');

  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)));
  }

  return new Response(JSON.stringify(examples), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

const examples = [
  { id: '1', word: 'abcdefg', ad: 'pitcher' },
  { id: '2', word: 'hijklmn', ad: 'catcher' },
  { id: '3', word: 'opqrstu', ad: 'infielder' },
  { id: '4', word: 'vwxyz', ad: 'outfielder' },
];
