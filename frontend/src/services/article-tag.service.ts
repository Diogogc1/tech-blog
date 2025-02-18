import ArticlePayload from "@/dtos/payload/article.payload";
import api from "./api.service";
import ArticleTagResponse from "@/dtos/response/article-tag.response";

export class ArticleTagService {
  async create(articleTagPayload: ArticlePayload): Promise<ArticleTagResponse> {
    const response = await api.post("/article-tag", articleTagPayload);
    return response.data;
  }

  async findAll(): Promise<ArticleTagResponse[]> {
    const response = await api.get("/article-tag");
    return response.data;
  }

  async findOne(id: number): Promise<ArticleTagResponse> {
    const response = await api.get(`/article-tag/${id}`);
    return response.data;
  }

  async findByArticleId(articleId: number): Promise<ArticleTagResponse[]> {
    const response = await api.get(`/article-tag/article/${articleId}`);
    return response.data;
  }

  async findByTagId(tagId: number): Promise<ArticleTagResponse[]> {
    const response = await api.get(`/article-tag/tag/${tagId}`);
    return response.data;
  }

  async update(
    id: number,
    articleTagPayload: ArticlePayload
  ): Promise<ArticleTagResponse> {
    const response = await api.put(`/article-tag/${id}`, articleTagPayload);
    return response.data;
  }

  async delete(id: number): Promise<ArticleTagResponse> {
    const response = await api.delete(`/article-tag/${id}`);
    return response.data;
  }
}

const articleTagService = new ArticleTagService();
export default articleTagService;
