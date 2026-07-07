const PlayListSkeleton = () => {
  return Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className='p-2 rounded-md flex items-center gap-3'>
      <div className='w-12 h-12 shrink-0 rounded-md bg-zinc-900 animate-pulse' />
      <div className='flex-1 min-w-0 space-y-2 shrink-0'>
        <div className='h-4 bg-zinc-900 rounded w-3/4 animate-pulse' />
        <div className='h-4 bg-zinc-900 rounded w-1/2 animate-pulse' />
      </div>
    </div>
  ))
}
export default PlayListSkeleton