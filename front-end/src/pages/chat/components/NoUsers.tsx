const NoUsers = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src="/spotify.png" alt="Spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">
        Start a conversation
      </h3>
      <p className="text-zinc-500 text-sm">
        When users join, they'll appear here so you can start chatting.
      </p>
    </div>
  </div>
);

export default NoUsers;
