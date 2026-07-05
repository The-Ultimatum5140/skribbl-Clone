import { APP_CONFIG } from "@/constants/appConstants";

const HeroSection = () => {
  return (
    <section className="space-y-3 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary)] text-4xl shadow-lg">
        🎨
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          {APP_CONFIG.NAME}
        </h1>

        <p className="text-sm text-[var(--color-text-muted)]">
          {APP_CONFIG.TAGLINE}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
