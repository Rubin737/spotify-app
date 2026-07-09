import { Button } from "@/components/ui/button";

const ErrorMessage = () => {
  return (
    <div className="flex border border-zinc-900 flex-col items-center justify-center bg-zinc-950 text-white lg:px-4">
      <h1 className="lg:text-6xl text-2xl font-bold text-green-500 lg:mb-4 mb-2">Oops!</h1>

      <h2 className="lg:text-2xl text-sm font-semibold mb-2">
        Something went wrong
      </h2>

      <p className="text-zinc-400 text-center max-w-md text-xs lg:text-sm lg:mb-6">
        We couldn't complete your request right now. Please try again later.
      </p>

      <Button
        variant="default"
        onClick={() => window.location.reload()}
        className="lg:px-5 text-xs  lg:py-2 rounded-lg cursor-pointer text-green-500 font-semibold hover:bg-green-400 transition"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorMessage;