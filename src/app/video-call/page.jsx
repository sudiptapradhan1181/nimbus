"use client";
import dynamic from "next/dynamic";

const CallParent = dynamic(() => import("@/components/CallParent"), {
  ssr: false,
});

export default function VideoCallPage() {
  return <CallParent />;
}
