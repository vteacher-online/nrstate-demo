'use client';

import { useState } from 'react';
import { z } from 'zod';
import { pathDemo } from './PageStateDemo';
import { getPageLocation } from 'nrstate-client/PageStateClient';

export default function G({
  id,
  name,
  pos,
  serverActionDBA,
}: {
  id: string;
  name: string;
  pos: string;
  serverActionDBA: ({
    id,
    name,
    pos,
    tag,
  }: {
    id: string;
    name: string;
    pos: string;
    tag: string;
  }) => Promise<string>;
}) {
  const [error, setError] = useState('');

  return (
    <>
      <div>
        {/* @ts-expect-error Async Server Component */}
        <form
          action={async (formData: FormData) => {
            // Validation - Zod

            const ValidationSchema = z.object({
              id: z.string().min(2),
              name: z.string().max(25),
              pos: z.string().max(10),
            });

            try {
              ValidationSchema.parse({
                id: formData.get('id'),
                name: formData.get('name'),
                pos: formData.get('pos'),
              } as z.infer<typeof ValidationSchema>);

              const result = await serverActionDBA({
                id: formData.get('id')?.toString() ?? '',
                name: formData.get('name')?.toString() ?? '',
                pos: formData.get('pos')?.toString() ?? '',
                tag: `${getPageLocation(
                  pathDemo,
                )}&id=${id}&name=${name}&pos=${pos}`,
              });

              console.log(result);

              setError('');
            } catch (error) {
              setError('Error');
            }
          }}
        >
          <input
            name="id"
            type="text"
            className="w-1/5 rounded border-gray-200"
            defaultValue={id}
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
          <p className="text-red-600">{error}</p>
        </form>
      </div>
    </>
  );
}
