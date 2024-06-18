"use server";
import { signIn, signOut } from "../../../EndPoint/authentication/auth";
import { cookies } from "next/headers";

export async function doSocialLogin(formData: any) {
  const action = formData.get("action");

  await signIn(action);
}

export async function doLogout() {
  cookies().delete("name");
  cookies().delete("image");
  cookies().delete("login");
  await signOut();
}
