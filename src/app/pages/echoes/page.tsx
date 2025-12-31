export default function EchoesPage() {
  return (
    <div className="min-h-[60vh] bg-background">
      <section className="flex justify-center text-center py-8 md:py-12 lg:py-16">
        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 px-4">

          <div className="flex flex-col gap-4 md:gap-6 max-w-4xl">
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg px-4">
              This section is currently under development. Check back soon for Echo data and stats.
            </p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground/70 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Coming Soon
          </div>
        </div>
      </section>
    </div>
  )
}