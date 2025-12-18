import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="flex justify-center text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="bg-card rounded-full p-2">
            <Image 
              src="/assets/site_icon.png"
              alt="Site Logo"
              quality={100}
              width={130}
              height={130}
            />
          </div>

          <h1 className="text-6xl font-bold text-center">Phrolova Project</h1>
          <p className="max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl">
            Phrolova is an unofficial Wuthering Waves database and tools site,
            offering clear stats, materials, and builds.
          </p>
        </div>
      </section>     
    </div>
  );
}
