"use server";

import { signIn } from "@/auth.config";
import { sleep } from "@/utils";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    //await sleep(3);
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    return "InvalidCredentials";
  }
}
