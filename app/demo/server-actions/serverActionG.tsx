'use server';

import { sql } from '@vercel/postgres';

export async function serverActionDBA({
  id,
  no,
  name,
  pos,
  tag,
}: {
  id: number;
  no: string;
  name: string;
  pos: string;
  tag: string;
}) {
  // ORM (Ex. Prisma)
  const { command, rowCount } =
    await sql`UPDATE players SET no=${no}, name=${name}, pos=${pos} WHERE id=${id}`;

  // const pageState = getPageState<PageStateDemo>(initialPageStateDemo, pathDemo);
  // experimental_setPageState<PageStateDemo>(
  //   {
  //     ...pageState,
  //   },
  //   pathDemo,
  //   () => {
  //     revalidateTag(tag);
  //   },
  // );

  return `{command: ${command}, rowCount: ${rowCount}}`;
}
