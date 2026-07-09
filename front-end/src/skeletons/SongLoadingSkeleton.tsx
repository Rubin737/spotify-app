const SongLoadingSkeleton = () => {

  return (
    <section>
      {/* Title skeleton */}
      <div className="lg:w-64 w-40 h-8 bg-red-500 rounded-md my-5 animate-pulse" />

      {/* Songs skeleton */}
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
        {
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex border border-zinc-800/50 relative gap-2 items-center bg-zinc-800 rounded-md animate-pulse"
            >
              {/* Image */}
              <div className="lg:size-18 size-12 rounded-l-md bg-zinc-700" />

              {/* Text */}
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 bg-zinc-700 rounded" />
                <div className="h-2 w-14 bg-zinc-700 rounded" />
              </div>


            </div>
          ))
        }
      </div>
    </section>
  );
};

export default SongLoadingSkeleton;