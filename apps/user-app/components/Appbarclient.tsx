
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Appbarclient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
   
    if (status === "unauthenticated") {
      
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  return (
    <div>
      <Appbar 
        onSignin={() => signIn()} 
        onSignout={async() => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        user={session?.user}
      />
    </div>
  );
}