'use client';

export default function H({
  serverActionValidationResult,
}: {
  serverActionValidationResult: (res: boolean) => Promise<void>;
}) {
  return (
    <button
      onClick={async () => {
        let validationResult = true; // true OR false

        await serverActionValidationResult(validationResult);
      }}
    >
      H
    </button>
  );
}
