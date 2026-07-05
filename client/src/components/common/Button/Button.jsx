import clsx from "clsx";

import { buttonSizes, buttonVariants } from "./button.styles";

const baseStyles =
  "inline-flex items-center justify-center rounded-[var(--radius-md)] font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? <>Loading...</> : children}
    </button>
  );
};

export default Button;
