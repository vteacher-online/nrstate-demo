'use client';

import { useState } from 'react';
import { ZodError, z } from 'zod';
import { pathDemo } from './PageStateDemo';
import { getPageLocation } from 'nrstate-client/PageStateClient';

export default function G({
  id,
  no,
  name,
  pos,
  serverActionDBA,
}: {
  id: number;
  no: string;
  name: string;
  pos: string;
  serverActionDBA: ({
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
  }) => Promise<string>;
}) {
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  return (
    <div>
      <form
        // @ts-expect-error Async Server Component
        action={async (formData: FormData) => {
          const ValidationSchema = z.object({
            no: z.string().min(2).max(2),
            name: z.string().min(1).max(20),
            pos: z.string().min(1).max(10),
          });

          try {
            ValidationSchema.parse({
              no: formData.get('no'),
              name: formData.get('name'),
              pos: formData.get('pos'),
            } as z.infer<typeof ValidationSchema>);

            const result = await serverActionDBA({
              id: Number(formData.get('id')),
              no: formData.get('id')?.toString() ?? '',
              name: formData.get('name')?.toString() ?? '',
              pos: formData.get('pos')?.toString() ?? '',
              tag: `${getPageLocation(
                pathDemo,
              )}&id=${id}&name=${name}&pos=${pos}`,
            });

            console.log(result);

            setInfo('Ran query successfully!');
            setTimeout(() => setInfo(''), 1500);
            setError('');
          } catch (error) {
            if (error instanceof ZodError) {
              const zodErrors = JSON.parse(error.message);
              zodErrors.map(
                ({ path, message }: { path: string[]; message: string }) => {
                  setError(`${path[0]}: ${message}`);
                },
              );
            } else {
              console.error(error);
              setError('Error');
            }
          }
        }}
      >
        <input name="id" type="hidden" defaultValue={id} />
        <input
          name="no"
          type="text"
          className="w-1/5 rounded border-gray-200"
          defaultValue={no}
        />
        <input
          name="name"
          type="text"
          className="w-2/5 rounded border-gray-200"
          defaultValue={name}
        />
        <input
          name="pos"
          type="text"
          className="w-1/5 rounded border-gray-200"
          defaultValue={pos}
        />
        <div className="inline w-1/5">
          <button className="w-16 rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700">
            Save
          </button>
        </div>
        {info && <div className="text-blue-600">{info}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
