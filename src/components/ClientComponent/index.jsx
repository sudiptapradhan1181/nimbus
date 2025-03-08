"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export default function ClientComponent() {
  const cookies = parseCookies();
  const router = useRouter();
  console.log(cookies);
  useEffect(() => {
    if (!cookies.accessToken) {
      router.replace("/auth");
    }
  }, [cookies, router]);
  return null;
}
