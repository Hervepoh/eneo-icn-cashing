import { Loader2 } from "lucide-react";
import Image from "next/image";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { SignUpPage } from "./signup";
import { DEFAULT_LOGIN_REDIRECT_URI } from "@/config/route.config";


export default async function Page() {

  return <SignUpPage />;
  // const isAuthenticated = await checkIsAuthenticated();

  // if (isAuthenticated) {
  //   redirect(DEFAULT_LOGIN_REDIRECT_URI);
  // } else {
  //   return <SignUpPage />;
  // }

}