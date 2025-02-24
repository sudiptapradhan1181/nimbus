"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import agoraToken from "agora-token";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function Home() {
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
