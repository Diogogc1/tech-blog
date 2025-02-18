"use client";

import ArticleResponse from "@/dtos/response/article.response";
import TagResponse from "@/dtos/response/tag.response";
import articleService from "@/services/article.service";
import tagService from "@/services/tag.service";
import articleTagService from "@/services/article-tag.service";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
	const [tags, setTags] = useState<TagResponse[]>([]);
	const [articles, setArticles] = useState<ArticleResponse[]>([]);
	const [pageAtual, setPageAtual] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [search, setSearch] = useState("");
	const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
	const router = useRouter();

	const fetchTags = useCallback(async () => {
		try {
			const response = await tagService.findAll();
			setTags(response);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const fetchArticles = useCallback(async (searchTerm = "") => {
		try {
			let response;
			if (searchTerm) {
				response = await articleService.search(searchTerm);
				setTotalPages(1);
			} else {
				const { articleResponse, total } = await articleService.findAll(pageAtual);
				response = articleResponse;
				setTotalPages(Math.ceil(total / 3));
			}
			setArticles(response);
		} catch (error) {
			console.error(error);
		}
	}, [pageAtual]);

	const fetchArticlesByTag = useCallback(async (tagId: number) => {
		try {
			console.log("tagId", tagId);
			const response = await articleTagService.findByTagId(tagId);

			console.log("response", response[0].article);
			const articles = response.map((articleTag) => articleTag.article);
			setArticles(articles);
			setTotalPages(1);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchTags();
	}, [fetchTags]);

	useEffect(() => {
		fetchArticles(search);
	}, [fetchArticles, search]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value);

		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		const timeout = setTimeout(() => {
			fetchArticles(value);
		}, 300);

		setDebounceTimeout(timeout);
	};

	const handleArticleClick = (id: number) => {
		router.push(`/article?id=${id}`);
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Todos os artigos</h1>
				<button className="bg-green-600 text-white px-4 py-2 rounded-lg">Criar artigo</button>
			</header>

			<div className="flex flex-wrap gap-2 mb-4">
				{tags.map((tag) => (
					<button
						key={tag.id}
						className="bg-gray-200 px-3 py-1 rounded-full"
						onClick={() => fetchArticlesByTag(tag.id)}
					>
						{tag.name}
					</button>
				))}
			</div>

			<input
				type="text"
				placeholder="Pesquisar..."
				className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
				value={search}
				onChange={handleSearchChange}
			/>

			<ul className="space-y-4">
				{articles.map((article) => (
					<li
						key={article.id}
						className="flex items-start gap-4 p-4 border-b cursor-pointer"
						onClick={() => handleArticleClick(article.id)}
					>
						<div>
							<h2 className="text-lg font-semibold">{article.title}</h2>
							<p className="text-gray-600 text-sm">
								{article.content ? article.content.substring(0, Math.floor(article.content.length / 3)) : ""}...
							</p>
						</div>
					</li>
				))}
			</ul>

			<div className="flex justify-center mt-6 gap-2">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
					<button
						key={num}
						className={`px-3 py-1 rounded-full ${num === pageAtual ? "bg-gray-900 text-white" : "bg-gray-200"}`}
						onClick={() => setPageAtual(num)}
					>
						{num}
					</button>
				))}
			</div>
		</div>
	);
}