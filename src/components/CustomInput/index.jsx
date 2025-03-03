export default function CustomInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  iconUrl,
  rightIconUrl,
  rightIconClick,
  handleBlur = () => {},
  isError = false,
  errorMessage = "Invalid input",
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white text-sm font-semibold">{label}</label>
      <div
        className={`w-[400px] h-[40px] rounded-full bg-[#111729] flex flex-row items-center p-4 gap-2 ${
          isError
            ? "ring-1 ring-red-500"
            : "focus-within:ring-1 focus-within:ring-[#4F45E4]"
        }`}
      >
        {iconUrl ? (
          <img src={iconUrl} alt={"input-icon"} className="w-[20px] h-[20px]" />
        ) : null}
        <input
          type={type}
          placeholder={placeholder}
          className="bg-[#111729] text-white w-full outline-none text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
        />
        {rightIconUrl ? (
          <img
            src={rightIconUrl}
            alt={"right-input-icon"}
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={rightIconClick}
          />
        ) : null}
      </div>
      {isError ? (
        <span className="text-red-500 text-xs font-medium">{errorMessage}</span>
      ) : null}
    </div>
  );
}
