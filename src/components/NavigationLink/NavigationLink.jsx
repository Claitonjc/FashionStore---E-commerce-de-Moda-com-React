import { Link } from "react-router-dom";

// ==========================================================================
// CONFIGURATIONS & STYLES
// ==========================================================================
const styles = {
  linkText: "text-dark ml-5 cursor-pointer self-start p-1.5 text-[16px]",

  linkButton:
    "bg-button-primary text-dark hover:bg-button-hover rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95",

  linkButtonWhite:
    "border-button-primary text-dark hover:bg-button-hover bg-general-background rounded-xl border px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95",
};

export const NavigationLink = ({
  to,
  text = "",
  variant = "linkText",
  disabled = false,
  className = "",
  onClick = "",
}) => {
  // ==========================================================================
  // 1. RENDER
  // ==========================================================================
  return (
    <Link
      to={to}
      className={` ${styles[variant]} ${disabled ? "pointer-events-none cursor-not-allowed opacity-50 active:scale-100" : ""} ${className} `}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};
