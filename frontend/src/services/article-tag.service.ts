const API_URL = 'http://localhost:3000/article-tag';

export class ArticleTagService {
	async create(articleTagPayload: any): Promise<any> {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(articleTagPayload),
		});
		return response.json();
	}

	async findAll(): Promise<any[]> {
		const response = await fetch(API_URL);
		return response.json();
	}

	async findByArticleId(id: number): Promise<any[]> {
		const response = await fetch(`${API_URL}/article/${id}`);
		return response.json();
	}

	async findByTagId(id: number): Promise<any[]> {
		const response = await fetch(`${API_URL}/tag/${id}`);
		return response.json();
	}

	async findOne(id: number): Promise<any> {
		const response = await fetch(`${API_URL}/${id}`);
		return response.json();
	}

	async delete(id: number): Promise<any> {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
		});
		return response.json();
	}
}