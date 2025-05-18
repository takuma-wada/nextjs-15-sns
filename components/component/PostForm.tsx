"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { addPostAction } from "@/lib/action";
import { useActionState } from "react";
import SubmitButton from "@/components/component/SubmitButton"

export default function PostForm() {

  const initState = {
    error: undefined,
    success: false
  }
  const [state, formAcion] = useActionState(addPostAction, initState);

  return (
    <div>s
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <form action={formAcion} className="flex items-center flex-1">
          <Input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 rounded-full bg-muted px-4 py-2"
            name="post"
          />
          <SubmitButton />
        </form>
      </div>
      {state.error && <p className="text-destructive mt-1 ml-14 font-bold">{state.error}</p>}
    </div>
  );
}
