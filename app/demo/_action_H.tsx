'use server';

let validationResult = false;

export async function serverActionValidationResult(result: boolean) {
  validationResult = result;
}

export async function serverActionDBAWithFormData(formData: FormData) {
  if (!validationResult) {
    return;
  }

  console.log(formData);
}
