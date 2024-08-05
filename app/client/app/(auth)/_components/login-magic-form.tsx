"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginMagicSchema } from "@/schemas";
import { FormError } from "./form-message-error";
import { FormSuccess } from "./form-message-success";
import { CardWrapper } from "./card-wrapper";
import { LuLoader2 } from "react-icons/lu";
import { loginMagic } from "@/actions/loginMagic";
import { REGISTER_PATH } from "@/routes";

type Props = {};

export const LoginMagicForm = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginMagicSchema>>({
    resolver: zodResolver(LoginMagicSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof LoginMagicSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    startTransition(() => {
      setError("");
      setSuccess("");
      // or you can use api route
      // axios.post('/api/login', values).then((response) => { setPost(response.data); });
      // fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json()).then(json => console.log(json));

      // using server action
      loginMagic(values)
      .then(data => { 
        console.log(data);
        setError(data?.error);
        setSuccess(data.success);
       });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account ?"
      backButtonHref={ REGISTER_PATH }
      showSocial={true}
      showMagicLink={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@genius.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );

};

