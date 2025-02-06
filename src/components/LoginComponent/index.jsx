export default function LoginComponent({
  channelName,
  setChannelName,
  generateToken,
  password,
  setPassword,
}) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <input
        className="m-4 p-2 rounded-md w-1/2 lg:w-1/4 text-black"
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />

      <input
        className="m-4 p-2 rounded-md w-1/2 lg:w-1/4 text-black"
        placeholder="Meet Code"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={generateToken}
        disabled={!(channelName && password)}
        className="bg-[#6570A3] rounded-md p-2 disabled:bg-gray-500"
      >
        Join Video Call
      </button>
    </div>
  );
}
