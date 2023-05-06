'use client';

import { useState } from 'react';
import { z } from 'zod';

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
  }: {
    id: string;
    name: string;
    pos: string;
  }) => Promise<string>;
}) {
  const [_id, set_Id] = useState(id);
  const [_name, set_Name] = useState(name);
  const [_pos, set_Pos] = useState(pos);
  const [error, setError] = useState('');

  return (
    <>
      <input
        type="text"
        defaultValue={_id}
        onChange={(e) => {
          set_Id(e.target.value);
        }}
      />
      <input
        type="text"
        defaultValue={_name}
        onChange={(e) => {
          set_Name(e.target.value);
        }}
      />
      <input
        type="text"
        defaultValue={_pos}
        onChange={(e) => {
          set_Pos(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          const ValidationSchema = z.object({
            id: z.string().min(2),
            name: z.string().max(25),
            pos: z.string().max(10),
          });

          try {
            ValidationSchema.parse({
              id: _id,
              name: _name,
              pos: _pos,
            } as z.infer<typeof ValidationSchema>);

            const result = await serverActionDBA({
              id: _id,
              name: _name,
              pos: _pos,
            });

            console.log(result);
            setError('');
          } catch (error) {
            setError('Error');
          }
        }}
      >
        G
      </button>
      <p className="text-red-600">{error}</p>
    </>
  );
}
