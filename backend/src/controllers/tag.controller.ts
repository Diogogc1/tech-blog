import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import TagPayload from "src/dtos/payload/tag.payload";
import TagResponse from "src/dtos/response/tag.response";
import { TagService } from "src/services/tag.service";

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  @ApiBody({ type: TagPayload })
  create(@Body() tagPayload: TagPayload): Promise<TagResponse> {
    return this.tagService.create(tagPayload);
  }

  @Get()
  getAll(): Promise<TagResponse[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<TagResponse> {
    return this.tagService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() tagPayload: TagPayload
  ): Promise<number> {
    return this.tagService.update(Number(id), tagPayload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.tagService.delete(Number(id));
  }
}