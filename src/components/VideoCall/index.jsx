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
  AgoraRTCScreenShareProvider,
  useTrackEvent,
  useLocalScreenTrack,
  LocalVideoTrack,
  LocalAudioTrack,
  RemoteVideoTrack,
  RemoteAudioTrack,
  useRemoteVideoTracks,
  useRemoteAudioTracks,
  useRemoteUserTrack,
} from "agora-rtc-react";
import { useEffect, useState } from "react";
import agoraToken from "agora-token";
import VideoPlaceholder from "../VideoPlaceholder";
import LoginComponent from "../LoginComponent";

export default function VideoCall() {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [channelName, setChannelName] = useState("");
  const [password, setPassword] = useState("");
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

  const [screenVideoTrack, setScreenVideoTrack] = useState(null);
  const [screenAudioTrack, setScreenAudioTrack] = useState(null);
  const [screenShareOn, setScreenShareOn] = useState(false);

  useTrackEvent(screenVideoTrack, "track-ended", () => {
    console.log("screen sharing ended");
    setScreenShareOn(false);
  });

  const { screenTrack, error: screenShareError } =
    useLocalScreenTrack(screenShareOn);

  useEffect(() => {
    if (!screenTrack) {
      setScreenAudioTrack(null);
      setScreenVideoTrack(null);
    } else {
      if (Array.isArray(screenTrack)) {
        setScreenVideoTrack(
          screenTrack.filter((track) => track.trackMediaType === "video")[0]
        );
        setScreenAudioTrack(
          screenTrack.filter((track) => track.trackMediaType === "audio")[0]
        );
      } else {
        setScreenVideoTrack(screenTrack);
      }
    }
  }, [screenTrack]);

  useEffect(() => {
    setScreenShareOn(false);
  }, [screenShareError]);

  usePublish([
    localMicrophoneTrack,
    localCameraTrack,
    // screenAudioTrack,
    // screenVideoTrack,
  ]);

  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);
  const audioTrack = useRemoteUserTrack(remoteUsers[0], "audio");

  const generateToken = () => {
    if (password !== process.env.NEXT_PUBLIC_MEET_CODE) {
      alert("Invalid Meet Code");
      return;
    }
    const timestamp = Math.floor(Date.now() / 1000) + tokenExpirationInSecond;
    const rtcToken = RtcTokenBuilder.buildTokenWithUserAccount(
      process.env.NEXT_PUBLIC_APP_ID,
      process.env.NEXT_PUBLIC_APP_CERTIFICATE,
      channelName,
      "",
      RtcRole.PUBLISHER,
      timestamp
    );
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
          <div className="w-full h-[90%] flex flex-col lg:flex-row">
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

            {screenShareOn ? (
              <>
                {screenVideoTrack && (
                  <LocalVideoTrack
                    disabled={!screenShareOn}
                    play={screenShareOn}
                    style={{ width: "100%", height: "100%" }}
                    track={screenVideoTrack}
                  />
                )}
                {screenAudioTrack && (
                  <LocalAudioTrack
                    disabled={!screenShareOn}
                    track={screenAudioTrack}
                  />
                )}
              </>
            ) : null}

            {/* {videoTracks?.length > 0 &&
              videoTracks?.map((track, idx) => {
                <RemoteVideoTrack key={idx} play track={track} />;
              })} */}

            {remoteUsers?.map((user, idx) => {
              console.log(user, "hello user");
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
            {/* <button onClick={() => setScreenShareOn(!screenShareOn)}>
              Share Screen
            </button> */}
            <button
              onClick={() => setCalling(false)}
              className="w-10 h-10 p-2 m-2 bg-[red] text-white rounded-full cursor-pointer"
            >
              <img src="/icons/call.svg" alt="leaveCall" />
            </button>
          </div>
        </div>
      ) : (
        <LoginComponent
          channelName={channelName}
          setChannelName={setChannelName}
          generateToken={generateToken}
          password={password}
          setPassword={setPassword}
        />
      )}
    </>
  );
}
