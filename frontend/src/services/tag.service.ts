import TagPayload from "@/dtos/payload/tag.payload";
import api from "./api.service";
import TagResponse from "@/dtos/response/tag.response";

export class TagService {
  async create(tagPayload: TagPayload): Promise<TagResponse> {
    const response = await api.post("/tag", tagPayload);
    return response.data;
  }

  async findAll(): Promise<TagResponse[]> {
    const response = await api.get("/tag");
    return response.data;
  }

  async findOne(id: number): Promise<TagResponse> {
    const response = await api.get(`/tag/${id}`);
    return response.data;
  }

  async update(id: number, tagPayload: TagPayload): Promise<TagResponse> {
    const response = await api.put(`/tag/${id}`, tagPayload);
    return response.data;
  }

  async delete(id: number): Promise<TagResponse> {
    const response = await api.delete(`/tag/${id}`);
    return response.data;
  }
}

const tagService = new TagService();
export default tagService;
