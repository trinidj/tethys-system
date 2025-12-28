import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[60vh] bg-background">
      <section className="flex justify-center text-center py-8 md:py-12 lg:py-16">
        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 px-4">
          <Image
            src="/assets/site_icon.png"
            alt="Site Logo"
            quality={100}
            width={160}
            height={160}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          />

          <div className="flex flex-col gap-4 md:gap-6 max-w-4xl">
            <h1 className="text-2xl font-bold text-center sm:text-3xl md:text-4xl lg:text-5xl">The Tethys System</h1>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg px-4">
              The Tethys System is an unofficial Wuthering Waves database and tools site,
              offering clear stats, materials, and builds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
