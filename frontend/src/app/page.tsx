"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center text-center h-full">
      <h2 className="text-5xl font-bold text-gray-900 mb-4">
        Insights & Learning
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        Explorando tendências Tech, um post por vez
      </p>
      <button onClick={() => router.push("/login")} className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition">
        Começar a ler
      </button>
    </main>
  );
}