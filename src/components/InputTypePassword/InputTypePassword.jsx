// Assets (Imagens, ícones locais, SVGs)
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export const InputTypePassword = ({
  type,
  placeholder,
  label,
  onChange,
  value,
  name,
  disabled,
}) => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [showPassword, setShowPassword] = useState(false);

  // ===================================================================
  // 2.HELPERS (Internal auxiliary functions)
  // ===================================================================
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // ==========================================================================
  // 3. RENDER
  // ==========================================================================
  return (
    <label className="text-dark relative mt-4 flex flex-col gap-1">
      {label}
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        required
        disabled={disabled}
        className="border-borders/30 focus:outline-borders/60 w-full max-w-sm rounded-xl border bg-white p-2 pr-12"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 top-7 right-4 flex cursor-pointer items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
      </button>
    </label>
  );
};
