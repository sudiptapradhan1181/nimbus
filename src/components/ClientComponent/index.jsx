"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export default function ClientComponent() {
  const cookies = parseCookies();
  const router = useRouter();
  useEffect(() => {
    if (!cookies.token) {
      router.replace("/auth");
    } else {
      router.replace("/dashboard");
    }
  }, [cookies, router]);
  return null;
}
