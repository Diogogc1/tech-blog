import ArticlePayload from "@/dtos/payload/article.payload";
import api from "./api.service";
import ArticleResponse from "@/dtos/response/article.response";

export class ArticleService {
  async create(articlePayload: ArticlePayload): Promise<ArticleResponse> {
    const response = await api.post("/article", articlePayload);
    return response.data;
  }

  async findAll(): Promise<ArticleResponse[]> {
    const response = await api.get("/article");
    return response.data;
  }

  async findOne(id: number): Promise<ArticleResponse> {
    const response = await api.get(`/article/${id}`);
    return response.data;
  }

  async update(
    id: number,
    articlePayload: ArticlePayload
  ): Promise<ArticleResponse> {
    const response = await api.put(`/article/${id}`, articlePayload);
    return response.data;
  }

  async delete(id: number): Promise<ArticleResponse> {
    const response = await api.delete(`/article/${id}`);
    return response.data;
  }

  async search(title: string): Promise<ArticleResponse[]> {
    const response = await api.get(`/article/search/${title}`);
    return response.data;
  }
}
