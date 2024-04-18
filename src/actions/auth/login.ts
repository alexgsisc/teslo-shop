"use server";

import { signIn } from "@/auth.config";
import { sleep } from "@/utils";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await sleep(3);
    await signIn("credentials", formData);
  } catch (error) {
    return 'Invalid credentials.';
  }
}
