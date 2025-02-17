const API_URL = 'http://localhost:3001/tag';

class TagService {
	async create(tagPayload: any): Promise<any> {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tagPayload),
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

	async update(id: number, tagPayload: any): Promise<any> {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tagPayload),
		});
		return response.json();
	}

	async delete(id: number): Promise<any> {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
		});
		return response.json();
	}
}

const tagService = new TagService();
export default tagService;