import clsx from "clsx";

const PageContainer = ({ children, className = "", ...props }) => {
  return (
    <main
      className={clsx(
        "min-h-screen w-full flex items-center justify-center px-4 py-8",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
};

export default PageContainer;
