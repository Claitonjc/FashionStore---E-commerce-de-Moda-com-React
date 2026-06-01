export const Input = ({ type, placeholder, label, onChange, value }) => {
  return (
    <label className="text-dark mt-4 flex flex-col gap-1">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
        className="border-borders/30 focus:outline-borders/60 w-full max-w-sm rounded-xl border bg-white p-2"
      />
    </label>
  );
};
