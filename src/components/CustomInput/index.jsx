export default function CustomInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  iconUrl,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white text-sm font-semibold">{label}</label>
      <div className="w-[400px] h-[40px] rounded-full bg-[#111729] flex flex-row items-center p-4 gap-2 focus-within:ring-1 focus-within:ring-[#4F45E4]">
        {iconUrl ? (
          <img src={iconUrl} alt={"input-icon"} className="w-[20px] h-[20px]" />
        ) : null}
        <input
          type={type}
          placeholder={placeholder}
          className="bg-[#111729] text-white w-full outline-none text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
