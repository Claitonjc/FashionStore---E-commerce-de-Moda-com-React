export const InputTypeFieldset = ({ label, type }) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder=" "
        className="peer border-borders/40 focus:outline-borders/60 w-full rounded-xl border bg-white p-2 outline-none"
        required
      />

      <label className="absolute top-2 left-3 bg-white px-1 text-gray-500 transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </label>
    </div>
  );
};
