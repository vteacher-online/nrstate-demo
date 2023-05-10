export default async function getAdWords(a: string) {
  try {
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
  } catch (error) {
    console.error(error);
    return [];
  }
}
