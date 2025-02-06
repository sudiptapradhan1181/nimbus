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
import { useEffect, useState } from "react";
import agoraToken from "agora-token";
import VideoPlaceholder from "../VideoPlaceholder";

export default function VideoCall() {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [channelName, setChannelName] = useState("");
  const [token, setToken] = useState("");
  const { RtcTokenBuilder, RtcRole } = agoraToken;
  const tokenExpirationInSecond = 3600;

  useJoin(
    {
      appid: process.env.NEXT_PUBLIC_APP_ID,
      channel: channelName,
      token: token ? token : null,
    },
    calling
  );

  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  const generateToken = () => {
    const timestamp = Math.floor(Date.now() / 1000) + tokenExpirationInSecond;
    const rtcToken = RtcTokenBuilder.buildTokenWithUserAccount(
      process.env.NEXT_PUBLIC_APP_ID,
      process.env.NEXT_PUBLIC_APP_CERTIFICATE,
      channelName,
      "",
      RtcRole.PUBLISHER,
      timestamp
    );
    console.log(rtcToken, "rtcToken");
    setToken(rtcToken);
  };

  useEffect(() => {
    if (token) {
      setCalling(true);
    }
  }, [token]);

  return (
    <>
      {isConnected ? (
        <div className="w-screen h-screen flex flex-col">
          <div className="w-full h-[90%] flex flex-row">
            <div className="relative w-full h-full rounded-md p-6">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                className="rounded-md"
              >
                {!cameraOn ? <VideoPlaceholder caption="You" /> : null}
                <div className="absolute bottom-2 right-2 p-2 bg-[#444575] text-[#FFFFFF] rounded-md">
                  <span>You</span>
                </div>
              </LocalUser>
            </div>

            {remoteUsers?.map((user, idx) => {
              return (
                <div
                  className="relative w-full h-full rounded-md p-6"
                  key={idx}
                >
                  <RemoteUser user={user} className="rounded-md">
                    {!user.hasVideo ? (
                      <VideoPlaceholder caption={user.uid} />
                    ) : null}
                    <div className="absolute bottom-2 right-2 p-2 bg-[#444575] text-[#FFFFFF] rounded-md">
                      <span>{user.uid}</span>
                    </div>
                  </RemoteUser>
                </div>
              );
            })}
          </div>

          <div className="flex flex-row items-center justify-center w-full h-[10%]">
            <button
              onClick={() => setMicOn(!micOn)}
              className="w-10 h-10 p-2 m-2 bg-white text-white rounded-full cursor-pointer"
            >
              {micOn ? (
                <img src="/icons/micOn.svg" alt="micOn" />
              ) : (
                <img src="/icons/micOff.svg" alt="micOff" />
              )}
            </button>
            <button
              onClick={() => setCameraOn(!cameraOn)}
              className="w-10 h-10 p-2 m-2 bg-white text-white rounded-full cursor-pointer"
            >
              {cameraOn ? (
                <img src="/icons/camOn.svg" alt="camOn" />
              ) : (
                <img src="/icons/camOff.svg" alt="camOff" />
              )}
            </button>
            <button
              onClick={() => setCalling(false)}
              className="w-10 h-10 p-2 m-2 bg-[red] text-white rounded-full cursor-pointer"
            >
              <img src="/icons/call.svg" alt="leaveCall" />
            </button>
          </div>
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
            onClick={generateToken}
            className="bg-gray-500 rounded-md p-2"
          >
            Join Video Call
          </button>
        </div>
      )}
    </>
  );
}
