import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex text-center space-x-2">
        <Loader2 size={32} className="animate-spin" />
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
}
