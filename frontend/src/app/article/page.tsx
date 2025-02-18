"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import articleService from '@/services/article.service';
import ArticleResponse from '@/dtos/response/article.response';

export default function Article() {
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const [article, setArticle] = useState<ArticleResponse | null>(null);

	useEffect(() => {
		const fetchArticle = async () => {
			if (id) {
				try {
					const response = await articleService.findOne(Number(id));
					setArticle(response);
				} catch (error) {
					console.error(error);
				}
			}
		};
		fetchArticle();
	}, [id]);

	if (!article) {
		return <div>Loading...</div>;
	}

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-3xl font-bold mb-2">{article.title}</h1>
			<p className="text-gray-600 text-sm mt-2">Publicado por {article.author.name}</p>

			<p className="text-gray-800 mt-4">
				{article.content}
			</p>

			<div className="mt-6 border-t pt-4">
				<h2 className="text-xl font-semibold mb-2">Comentários</h2>
				<textarea
					className="w-full p-2 border rounded-lg"
					placeholder="Escreva um comentário..."
				></textarea>
				<button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Comentar</button>
			</div>

			<div className="mt-4">
				<div className="border-b pb-2 mb-2">
					<p className="font-semibold">Maria Luiza <span className="text-gray-500 text-sm">2d</span></p>
					<p>Ótimo artigo! Acho importante lembrar que um design system não é apenas um conjunto de componentes...</p>
				</div>
				<div className="border-b pb-2 mb-2">
					<p className="font-semibold">Gilberto <span className="text-gray-500 text-sm">2d</span></p>
					<p>Concordo. Trata-se de criar uma linguagem compartilhada entre designers e desenvolvedores...</p>
				</div>
			</div>
		</div>
	);
}