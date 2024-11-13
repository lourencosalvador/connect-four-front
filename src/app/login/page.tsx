"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {

  return (
    <div className="w-full h-dvh bg-zinc-950 flex flex-col gap-6 justify-center items-center">
      <h1 className="text-2xl text-white">Faz o login para continuar a experiencia 😊</h1>
      <div className="size-auto flex gap-6 items-center">
        <Button  onClick={() => signIn("github", { callbackUrl: "/" })}>Login Github</Button>
      </div>
    </div>
  );
}
