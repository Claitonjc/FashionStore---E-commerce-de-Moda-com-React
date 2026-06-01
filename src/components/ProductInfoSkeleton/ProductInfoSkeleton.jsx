export const ProductInfoSkeleton = () => {
  return (
    <div className="border-skeleton-border/40 bg-skeleton mt-5 mr-5 flex min-h-150 w-[70%] animate-pulse rounded-2xl border p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="ml-5 flex h-full w-full items-center justify-center">
        <div className="bg-skeleton-bg mt-7 min-h-125 w-[70%] rounded-md"></div>
      </div>
      <div className="mt-7 ml-3 flex h-full w-full flex-col items-center gap-7">
        <div className="flex w-[80%] flex-col gap-1">
          <div className="bg-skeleton-bg h-6 rounded-md"></div>
          <div className="bg-skeleton-bg h-3.5 w-[20%] rounded-md"></div>
        </div>

        <div className="bg-skeleton-bg mt-5 ml-16 h-10.5 w-[20%] self-start rounded-md"></div>

        <div className="flex w-[80%] flex-col gap-2">
          <div className="bg-skeleton-bg h-4.5 w-[30%] rounded-md"></div>
          <div className="bg-skeleton-bg h-4.5 w-[90%] rounded-md"></div>
          <div className="bg-skeleton-bg h-4.5 w-[85%] rounded-md"></div>
          <div className="bg-skeleton-bg h-4.5 w-[95%] rounded-md"></div>
          <div className="bg-skeleton-bg h-4.5 w-[70%] rounded-md"></div>
        </div>
        <div className="bg-skeleton-bg mt-5 h-11 w-[50%] self-center rounded-2xl"></div>
      </div>
    </div>
  );
};
