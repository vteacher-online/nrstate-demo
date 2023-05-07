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

  const [isEditing, setEditing] = useState(false);

  return (
    <>
      <div>
        {isEditing ? (
          <>
            <input
              className="w-1/5"
              type="text"
              defaultValue={_id}
              onChange={(e) => {
                set_Id(e.target.value);
              }}
            />
            <input
              className="w-2/5"
              type="text"
              defaultValue={_name}
              onChange={(e) => {
                set_Name(e.target.value);
              }}
            />
            <input
              className="w-2/5"
              type="text"
              defaultValue={_pos}
              onChange={(e) => {
                set_Pos(e.target.value);
              }}
            />
            <button
              className="w-fit rounded"
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

                  setEditing(false);
                  setError('');
                } catch (error) {
                  setError('Error');
                }
              }}
            >
              ✅
            </button>
            <button
              className="w-fit rounded"
              onClick={async () => {
                setEditing(false);
              }}
            >
              ❎
            </button>
            <p className="text-red-600">{error}</p>
          </>
        ) : (
          <>
            <span className="w-1/5">{id}</span>
            <span className="w-2/5">{name}</span>
            <span className="w-2/5">{pos}</span>
            <button
              className="w-fit rounded"
              onClick={() => {
                setEditing(true);
              }}
            >
              ✏️
            </button>
          </>
        )}
      </div>
    </>
  );
}
