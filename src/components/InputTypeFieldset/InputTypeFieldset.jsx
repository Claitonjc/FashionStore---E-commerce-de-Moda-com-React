export const InputTypeFieldset = ({
  label,
  type,
  name,
  value,
  onChange,
  className = "",
  ...rest
}) => {
  // ==========================================================================
  // 1. RENDER
  // ==========================================================================
  return (
    <div className="relative flex w-full">
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder=" "
        {...rest}
        className={`peer border-borders/40 focus:outline-borders/60 w-full rounded-xl border bg-white p-2 text-sm outline-none sm:text-base ${className}`}
      />

      <label
        htmlFor={name}
        className="absolute top-3 left-3 cursor-text bg-white px-1 text-xs text-gray-500 transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-2 sm:text-sm"
      >
        {label}
      </label>
    </div>
  );
};
