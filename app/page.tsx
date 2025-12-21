import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="flex justify-center text-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <Image
            src="/assets/site_icon.png"
            alt="Site Logo"
            quality={100}
            width={160}
            height={160}
          />

          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl">The Tethys System</h1>
            <p className="max-w-3xl text-base text-muted-foreground sm:text-lg md:text-lg">
              The Tethys System is an unofficial Wuthering Waves database and tools site,
              offering clear stats, materials, and builds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
