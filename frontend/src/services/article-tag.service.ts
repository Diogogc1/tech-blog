import ArticlePayload from "@/dtos/payload/article.payload";
import api from "./api.service";
import ArticleResponse from "@/dtos/response/article.response";

export class ArticleTagService {
  async create(articleTagPayload: ArticlePayload): Promise<ArticleResponse> {
    const response = await api.post("/article-tag", articleTagPayload);
    return response.data;
  }

  async findAll(): Promise<ArticleResponse[]> {
    const response = await api.get("/article-tag");
    return response.data;
  }

  async findOne(id: number): Promise<ArticleResponse> {
    const response = await api.get(`/article-tag/${id}`);
    return response.data;
  }

  async findByArticleId(articleId: number): Promise<ArticleResponse[]> {
    const response = await api.get(`/article-tag/article/${articleId}`);
    return response.data;
  }

  async findByTagId(tagId: number): Promise<ArticleResponse[]> {
    const response = await api.get(`/article-tag/tag/${tagId}`);
    return response.data;
  }

  async update(
    id: number,
    articleTagPayload: ArticlePayload
  ): Promise<ArticleResponse> {
    const response = await api.put(`/article-tag/${id}`, articleTagPayload);
    return response.data;
  }

  async delete(id: number): Promise<ArticleResponse> {
    const response = await api.delete(`/article-tag/${id}`);
    return response.data;
  }
}
