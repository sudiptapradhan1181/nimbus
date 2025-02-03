"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import agoraToken from "agora-token";

export default function Home() {
  const router = useRouter();
  const { RtcRole } = agoraToken;
  const [channelName, setChannelName] = useState("");
  const [userType, setUserType] = useState();
  return (
    <div>
      <h1>Welcome to the Agora Video Call App</h1>
      <p>Click the button below to join the video call</p>
      <input
        className="m-2 p-2 rounded-md w-1/4 text-black"
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <div className="flex flex-row items-center">
        <input
          type="radio"
          name="userType"
          value={RtcRole.PUBLISHER}
          onChange={() => setUserType(RtcRole.PUBLISHER)}
        />
        <label>Publisher</label>

        <input
          type="radio"
          name="userType"
          value={RtcRole.SUBSCRIBER}
          onChange={() => setUserType(RtcRole.SUBSCRIBER)}
        />
        <label>Subscriber</label>
      </div>
      <button
        onClick={() =>
          router.push(
            "/video-call?channel=" + channelName + "&userType=" + userType
          )
        }
        className="bg-gray-500 rounded-md p-2"
      >
        Join Video Call
      </button>
    </div>
  );
}
