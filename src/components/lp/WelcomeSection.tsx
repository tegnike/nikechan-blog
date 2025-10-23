export function WelcomeSection() {
  return (
    <section
      className="relative min-h-[calc(100svh-5rem)] flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: "url(/images/lp/bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="ヒーローセクション"
    >
      {/* White gradient overlay: subtle at top, stronger at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0.82) 100%)",
        }}
      />

      {/* Centered character image with hover and click interactions */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="sr-only">AIニケちゃんオフィシャルサイト</h1>
        <img
          src="/images/lp/top.webp"
          alt="Nike Chan（ニケちゃん）のメインビジュアル - デジタルアート作品"
          className="w-full max-w-[576px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
          style={{
            filter: [
              "drop-shadow(0 0 36px rgba(255,255,255,0.98))",
              "drop-shadow(0 0 80px rgba(255,255,255,0.78))",
              "drop-shadow(0 0 120px rgba(255,255,255,0.5))",
            ].join(" "),
          }}
          loading="eager"
          width="576"
          height="800"
        />
      </div>
    </section>
  );
}
