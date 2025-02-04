"use client";
import dynamic from "next/dynamic";

const CallComponent = dynamic(() => import("@/components/CallComponent"), {
  ssr: false,
});

export default function VideoCallPage() {
  return <CallComponent />;
}
