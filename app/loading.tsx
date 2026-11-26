export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-56 rounded-3xl bg-gray-200" />
      {Array.from({ length: 2 }).map((_, section) => (
        <section key={section} className="space-y-4">
          <div className="h-7 w-48 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-gray-100" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
