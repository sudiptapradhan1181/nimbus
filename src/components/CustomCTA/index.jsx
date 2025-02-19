export default function CustomCTA({
  text,
  primaryIconUrl,
  secondaryIconUrl,
  handleClick,
  btnBg = "bg-[#4F45E4]",
}) {
  return (
    <button
      className={` w-[400px] h-[40px] ${btnBg} flex flex-row items-center justify-center gap-1 rounded-full cursor-pointer `}
      onClick={handleClick}
    >
      {primaryIconUrl ? (
        <img
          src={primaryIconUrl}
          alt={"btn-icon-primary"}
          className="w-5 h-5"
        />
      ) : null}
      <span className="text-white text-sm font-semibold">{text}</span>
      {secondaryIconUrl ? (
        <img
          src={secondaryIconUrl}
          alt={"btn-icon-secondary"}
          className="w-5 h-5"
        />
      ) : null}
    </button>
  );
}
