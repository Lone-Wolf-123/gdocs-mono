import { Controller, Get, Post, Patch, Param, Body, Req, NotFoundException } from '@nestjs/common';
import { DocsService } from './docs.service';
import { CreateDocumentDTO, DocumentDTO, UpdateDocumentDTO } from '@gdocs/shared/document.dto.js';
import { plainToInstance } from 'class-transformer';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  async findAll(@Req() req) {
    const docs = await this.docsService.findAll(req.user.id);

    return plainToInstance(DocumentDTO, docs, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req) {
    const doc = await this.docsService.getOne(id, req.user.id);
    if (!doc) throw new NotFoundException('Document not found');
    return plainToInstance(DocumentDTO, doc, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async create(@Body() body: CreateDocumentDTO, @Req() req) {
    const doc = await this.docsService.create(body, req.user.id);
    if (!doc) throw new NotFoundException('Document not found');
    return plainToInstance(DocumentDTO, doc, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDocumentDTO, @Req() req) {
    const doc = await this.docsService.update(id, body, req.user.id);
    if (!doc) throw new NotFoundException('Document not found');
    return plainToInstance(DocumentDTO, doc, {
      excludeExtraneousValues: true,
    });
  }
}
