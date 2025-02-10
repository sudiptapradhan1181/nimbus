"use client";
import dynamic from "next/dynamic";
import AgoraRTC, {
  AgoraRTCProvider,
  AgoraRTCScreenShareProvider,
} from "agora-rtc-react";
const VideoCall = dynamic(() => import("@/components/VideoCall"), {
  ssr: false,
});

export default function CallParent() {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  return (
    <AgoraRTCProvider client={client}>
      <AgoraRTCScreenShareProvider client={client}>
        <VideoCall />
      </AgoraRTCScreenShareProvider>
    </AgoraRTCProvider>
  );
}
