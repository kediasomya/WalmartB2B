import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-800">Welcome to Walmart B2B</h1>
      <p className="mb-8 text-black text-lg text-center max-w-xl">
        Discover near-expiry deals, manage inventory, and connect with buyers and sellers. Choose your portal to get started:
      </p>
      <div className="flex gap-8">
        <a
          href="/buyer"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xl shadow hover:bg-blue-700 transition"
        >
          I am a Buyer
        </a>
        <a
          href="/admin"
          className="bg-gray-200 text-blue-800 px-8 py-4 rounded-lg font-bold text-xl shadow hover:bg-blue-100 transition"
        >
          I am an Admin
        </a>
      </div>
    </main>
  );
}
