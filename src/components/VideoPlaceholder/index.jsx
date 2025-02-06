export default function VideoPlaceholder({ caption }) {
  return (
    <div className="w-full h-full bg-[#6570A3] rounded-md justify-center items-center flex relative">
      <div className="w-[100px] h-[100px] bg-[#444575] rounded-full justify-center items-center flex">
        <img src="/icons/user.svg" alt="user" className="w-[60%] h-[60%]" />
      </div>
      <div className="absolute bottom-2 right-2 p-2 bg-[#444575] text-[#FFFFFF] rounded-md">
        <span>{caption}</span>
      </div>
    </div>
  );
}
