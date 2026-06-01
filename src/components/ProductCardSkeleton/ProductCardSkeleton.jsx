export const ProductCardSkeleton = () => {
  return (
    <section className="border-skeleton-border bg-skeleton w-72 animate-pulse rounded-2xl border p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="bg-skeleton-bg mx-auto mb-6 h-4 w-3/4 rounded px-2"></div>
      <div className="bg-skeleton-bg mb-6 h-64 rounded-2xl"></div>
      <div className="bg-skeleton-bg mx-auto mb-6 h-8 w-1/2 rounded"></div>
      <div className="bg-skeleton-bg h-12 rounded-xl"></div>
    </section>
  );
};
