"use client";
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState } from "react";

export default function VideoCall() {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [channelName, setChannelName] = useState("");
  const [token, setToken] = useState(
    "007eJxTYLh6bOcN3aPpp2UnJWstP7Drfalp78prWyMCF8j7JPwQrolUYDBISjFKTTWyNDK2SDFJMjBKtExNNLVISTNJtTS1NDU1S362ML0hkJFBLD2JlZEBAkF8ZoaikmQGBgC1JCAy"
  );

  useJoin(
    {
      appid: process.env.NEXT_PUBLIC_APP_ID,
      channel: "rtc",
      token: token ? token : null,
    },
    calling
  );

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  console.log(remoteUsers, "remoteUsers");

  return (
    <>
      {isConnected ? (
        <div className="flex flex-row">
          <div className="w-[600px] h-[600px] bg-red-500">
            <LocalUser
              audioTrack={localMicrophoneTrack}
              cameraOn={cameraOn}
              micOn={micOn}
              videoTrack={localCameraTrack}
              cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
            >
              <samp className="user-name">You</samp>
            </LocalUser>
          </div>
          {/* <div className="w-[600px] h-[600px] bg-red-500" ></div> */}
          {remoteUsers?.map((user, idx) => {
            return (
              <div className="w-[600px] h-[600px] bg-red-500" key={idx}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <input
            className="m-2 p-2 rounded-md w-1/4 text-black"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <button
            onClick={() => setCalling(true)}
            className="bg-gray-500 rounded-md p-2"
          >
            Join Video Call
          </button>
        </div>
      )}
    </>
  );
}
