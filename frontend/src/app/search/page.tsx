"use client"

import TagResponse from "@/dtos/response/tag.response";
import tagService from "@/services/tag.service";
import { useCallback, useEffect, useState } from "react";

export default function Search() {
	const [tags, setTags] = useState<TagResponse[]>([]);

	const fetchTags = useCallback(async () => {
		try {
			const response = await tagService.findAll();
			setTags(response);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchTags();
	}, [fetchTags]);

	return (
		<div>
			<h1>Search</h1>
			<ul>
				{tags.map((tag) => (
					<li key={tag.id}>{tag.name}</li>
				))}
			</ul>
		</div>
	);
}