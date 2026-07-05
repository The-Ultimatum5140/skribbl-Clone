import clsx from "clsx";

import { cardVariants } from "./card.styles";

const baseStyles =
  "rounded-[var(--radius-lg)] p-6 shadow-lg transition-all duration-200";

const Card = ({ children, variant = "default", className = "", ...props }) => {
  return (
    <div
      className={clsx(baseStyles, cardVariants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
