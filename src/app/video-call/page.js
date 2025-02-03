"use client";
import AgoraRTC from "agora-rtc-sdk-ng";
import agoraToken from "agora-token";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VideoCall() {
  const [channelName, setChannelName] = useState("");
  const { RtcTokenBuilder, RtcRole } = agoraToken;
  const searchParams = useSearchParams();

  let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null, // AgoraRTC client object
  };

  let options = {
    appId: "0bd2ee29238d4b02a9ea58df4e959556", // Your app ID
    appCertificate: "85ebaeebd4cc416ca467492c62205f5a",
    uid: Math.ceil(Math.random() * 100000), // User ID
  };

  let tokenWithUid = "";

  const tokenExpirationInSecond = 3600;
  // The validity time of all permissions in seconds
  const privilegeExpirationInSecond = 3600;

  // Initialize the AgoraRTC client
  function initializeClient() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setupEventListeners();
  }

  // Join a channel and publish local media
  async function joinChannel() {
    await rtc?.client?.join(
      options.appId,
      channelName,
      tokenWithUid,
      options.uid
    );
    await createAndPublishLocalTracks();
    displayLocalVideo();
    console.log("Publish success!");
  }

  // Create and publish local tracks
  async function createAndPublishLocalTracks() {
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await rtc?.client?.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
  }

  function displayRemoteVideo(user) {
    const remotePlayerContainer = document.createElement("div");
    remotePlayerContainer.id = user.uid.toString();
    remotePlayerContainer.textContent = `Remote user ${user.uid}`;
    remotePlayerContainer.style.width = "640px";
    remotePlayerContainer.style.height = "480px";
    document.body.append(remotePlayerContainer);
    user.videoTrack.play(remotePlayerContainer);
  }

  function displayLocalVideo() {
    const localPlayerContainer = document.createElement("div");
    localPlayerContainer.id = options.uid;
    localPlayerContainer.textContent = `Local user ${options.uid}`;
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    document.body.append(localPlayerContainer);
    rtc.localVideoTrack.play(localPlayerContainer);
  }

  async function leaveChannel() {
    // Close local tracks
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    // Remove local video container
    const localPlayerContainer = document.getElementById(options.uid);
    localPlayerContainer && localPlayerContainer.remove();
    // Remove all remote video containers
    rtc.client.remoteUsers.forEach((user) => {
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
    // Leave the channel
    await rtc.client.leave();
  }

  function setupEventListeners() {
    rtc.client.on("user-published", async (user, mediaType) => {
      await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");
      if (mediaType === "video") {
        displayRemoteVideo(user);
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });
    rtc.client.on("user-unpublished", (user) => {
      const remotePlayerContainer = document.getElementById(user.uid);
      remotePlayerContainer && remotePlayerContainer.remove();
    });
  }

  useEffect(() => {
    const channel = searchParams.get("channel");
    const userType =
      searchParams.get("userType") === "1"
        ? RtcRole.PUBLISHER
        : RtcRole.SUBSCRIBER;
    const tokenFromServer = searchParams.get("token");
    setChannelName(channel);
    initializeClient();
    tokenWithUid = tokenFromServer
      ? tokenFromServer
      : RtcTokenBuilder.buildTokenWithUid(
          options.appId,
          options.appCertificate,
          channel,
          options.uid,
          userType === "1" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER,
          tokenExpirationInSecond,
          privilegeExpirationInSecond
        );

    console.log("Token with UID: ", tokenWithUid);
    console.log("Token: ", tokenFromServer);
    console.log("token role", userType, RtcRole.SUBSCRIBER);
  }, []);

  return (
    <div className="w-screen bg-gray-800">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <button
            onClick={joinChannel}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Join Channel
          </button>
          <button
            onClick={leaveChannel}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Leave Channel
          </button>
        </div>
      </div>
    </div>
  );
}
