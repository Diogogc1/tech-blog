const API_URL = 'http://localhost:3000/article';

export class ArticleService {
	async create(articlePayload: any): Promise<any> {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(articlePayload),
		});
		return response.json();
	}

	async findAll(): Promise<any[]> {
		const response = await fetch(API_URL);
		return response.json();
	}

	async findOne(id: number): Promise<any> {
		const response = await fetch(`${API_URL}/${id}`);
		return response.json();
	}

	async update(id: number, articlePayload: any): Promise<any> {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(articlePayload),
		});
		return response.json();
	}

	async delete(id: number): Promise<any> {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
		});
		return response.json();
	}

	async search(title: string): Promise<any[]> {
		const response = await fetch(`${API_URL}/search/${title}`);
		return response.json();
	}
}