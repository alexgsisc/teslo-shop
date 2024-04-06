"use server";

import { signIn } from "@/auth.config";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log(Object.fromEntries(formData));
    await signIn("credentials", formData);
  } catch (error) {
    return 'Invalid credentials.';
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return "Invalid credentials.";
    //     default:
    //       return "Something went wrong.";
    //   }
    // }
    //throw error;
  }
}
