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

  return new Response(JSON.stringify(reviews), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

const reviews = [
  { id: '11', name: 'Yu Darvish', pos: 'pitcher' },
  { id: '12', name: 'Shosei Togo', pos: 'pitcher' },
  { id: '13', name: 'Yuki Matsui', pos: 'pitcher' },
  { id: '14', name: 'Roki Sasaki', pos: 'pitcher' },
  { id: '15', name: 'Taisei Ota', pos: 'pitcher' },
  { id: '16', name: 'Shohei Ohtani', pos: 'pitcher' },
  { id: '17', name: 'Hiromi Itoh', pos: 'pitcher' },
  { id: '18', name: 'Yoshinobu Yamamoto', pos: 'pitcher' },
  { id: '20', name: 'Ryoji Kuribayashi', pos: 'pitcher' },
  { id: '21', name: 'Shota Imanaga', pos: 'pitcher' },
  { id: '22', name: 'Atsuki Yuasa', pos: 'pitcher' },
  { id: '26', name: 'Yuki Udagawa', pos: 'pitcher' },
  { id: '28', name: 'Hiroto Takahashi', pos: 'pitcher' },
  { id: '29', name: 'Hiroya Miyagi', pos: 'pitcher' },
  { id: '47', name: 'Keiji Takahashi', pos: 'pitcher' },
  { id: '63', name: 'Soichiro Yamazaki', pos: 'pitcher' },

  { id: '10', name: 'Takuya Kai', pos: 'catcher' },
  { id: '24', name: 'Takumi Ohshiro', pos: 'catcher' },
  { id: '27', name: 'Yuhei Nakamura', pos: 'catcher' },

  { id: '01', name: 'Tetsuto Yamada', pos: 'infielder' },
  { id: '02', name: 'Sosuke Genda', pos: 'infielder' },
  { id: '03', name: 'Shugo Maki', pos: 'infielder' },
  { id: '05', name: 'Taisei Makihara', pos: 'infielder' },
  { id: '07', name: 'Takumu Nakano', pos: 'infielder' },
  { id: '25', name: 'Kazuma Okamoto', pos: 'infielder' },
  { id: '33', name: 'Hotaka Yamakawa', pos: 'infielder' },
  { id: '55', name: 'Munetaka Murakami', pos: 'infielder' },

  { id: '08', name: 'Kensuke Kondo', pos: 'outfielder' },
  { id: '09', name: 'Ukyo Shuto', pos: 'outfielder' },
  { id: '23', name: 'Lars Nootbaar', pos: 'outfielder' },
  { id: '34', name: 'Masataka Yoshida', pos: 'outfielder' },
];
