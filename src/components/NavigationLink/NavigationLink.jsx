import { Link } from "react-router-dom";

export const NavigationLink = ({ rout, text = "", variant = "linkText" }) => {
  const styles = {
    linkText: {
      link: "text-dark ml-5 cursor-pointer self-start p-1.5 text-[16px]",
    },
    linkButton: {
      link: "bg-button-primary text-dark hover:bg-button-hover rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95",
    },
    linkButtonWhite: {
      link: "border-button-primary text-dark hover:bg-button-hover bg-general-background rounded-xl border px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95",
    },
  };

  return (
    <Link to={rout} className={styles[variant].link}>
      {text}
    </Link>
  );
};
