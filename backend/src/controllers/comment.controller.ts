import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import CommentPayload from 'src/dtos/payload/comment.payload';
import CommentResponse from 'src/dtos/response/comment.response';
import { CommentService } from 'src/services/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiBody({ type: CommentPayload })
  create(@Body() commentPayload: CommentPayload): Promise<CommentResponse> {
    return this.commentService.create(commentPayload);
  }

  @Get()
  getAll(): Promise<CommentResponse[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<CommentResponse> {
    return this.commentService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() commentPayload: CommentPayload,
  ): Promise<number> {
    return this.commentService.update(Number(id), commentPayload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.commentService.delete(Number(id));
  }
}
