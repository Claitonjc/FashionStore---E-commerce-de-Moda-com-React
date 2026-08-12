export const Input = ({
  type,
  placeholder,
  label,
  onChange,
  value,
  name,
  disabled,
}) => {
  // ==========================================================================
  // 1. RENDER
  // ==========================================================================
  return (
    <label className="text-dark mt-4 flex flex-col gap-1">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        required
        disabled={disabled}
        className="border-borders/30 focus:outline-borders/60 w-full max-w-md rounded-xl border bg-white p-2 pr-12"
      />
    </label>
  );
};
