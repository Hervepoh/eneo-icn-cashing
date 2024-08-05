"use client";

import { FcGoogle } from "react-icons/fc";
import { useTransition, useState } from "react";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { handleEmailSignIn } from "@/lib/auth/emailSignInServerAction";
import { Loader2 } from "lucide-react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas";
import { RegisterForm } from "../_components/register-form";

export const SignUpPage: React.FC = () => {
  const [type, setType] = useState("credentials");

  return (
    <>
      <div className="text-center space-y-4 pt-16">
        <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back !</h1>
        <p className="text-base text-[#7E8CA0]">
          Log in or Create account to get back to your dashboard !
        </p>
      </div>
      <div className="flex items-center justify-center mt-8 md:w-[100%] lg:max-w-[400px]">
        <RegisterForm />
      </div>
    </>
  );

};
