import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col gap-4 md:gap-6">
      <section className="flex flex-col gap-3 md:gap-4 px-2 sm:px-0">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48 sm:h-9 md:h-10" />
          <Skeleton className="h-5 w-72 sm:h-6 md:h-7" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {[...Array(16)].map((_, i) => (
            <Skeleton key={i} className="aspect-3/4 rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  )
}
