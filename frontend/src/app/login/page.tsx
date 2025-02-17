"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Email:", email, "Senha:", password);
		router.push("/search");
	};

	return (
		<main className="w-1/2 h-full p-6 flex flex-col justify-center">
			<h2 className="text-3xl font-bold text-center mb-6">Bem-vindo de volta</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 bg-green-100 rounded-md placeholder-gray-500 focus:outline-none"
						placeholder="Email"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium">Senha</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 bg-green-100 rounded-md placeholder-gray-500 focus:outline-none"
						placeholder="Senha"
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
				>
					Entrar
				</button>
			</form>
		</main>
	);
}
