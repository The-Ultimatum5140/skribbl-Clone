import clsx from "clsx";

import { inputVariants } from "./input.styles";

const baseStyles =
  "w-full rounded-[var(--radius-md)] px-4 py-3 outline-none transition-all duration-200 placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-50";

const Input = ({
  label,
  type = "text",
  error,
  fullWidth = true,
  className = "",
  ...props
}) => {
  return (
    <div className={clsx(fullWidth && "w-full")}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}

      <input
        type={type}
        className={clsx(
          baseStyles,
          error ? inputVariants.error : inputVariants.default,
          className,
        )}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  );
};

export default Input;
