"use client";
import dynamic from "next/dynamic";

const AgoraWrapper = dynamic(() => import("@/components/AgoraWrapper"), {
  ssr: false,
});

export default function VideoCallPage() {
  return <AgoraWrapper />;
}
