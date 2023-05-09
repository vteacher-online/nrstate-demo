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
  {
    id: '1',
    word: 'pitcher Ohtani Ootani outani ootani Darvish Togo Matsui Sasaki Ota Itoh Yamamoto Kuribayashi Imanaga Yuasa Udagawa Takahashi Miyagi Yamazaki',
    ad: 'WBC Official Ball 🥎',
  },
  {
    id: '2',
    word: 'catcher Kai Ohshiro Nakamura',
    ad: 'Baseball Mitts 👋',
  },
  {
    id: '3',
    word: 'infielder Yamada Genda Maki Makihara Nakano Okamoto Yamakawa Murakami',
    ad: 'Baseball Gloves & Spikes 👟',
  },
  {
    id: '4',
    word: 'outfielder Kondo Shuto Nootbaar Yoshida',
    ad: 'Baseball Bats 🏟',
  },
];
