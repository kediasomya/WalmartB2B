export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-b-4 border-gray-200 mb-4"></div>
      <div className="text-lg font-semibold">Loading...</div>
    </div>
  );
} 