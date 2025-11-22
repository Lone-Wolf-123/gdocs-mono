import { Injectable } from '@nestjs/common';
import { CreateDocumentDTO, UpdateDocumentDTO } from '@gdocs/shared/document.dto.js';
import { PrismaService } from '../prisma.service';
import { Document } from '@prisma/client';

@Injectable()
export class DocsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: string): Promise<Document[] | null> {
    return this.prismaService.document.findMany({
      where: { authorId: userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getOne(id: string, userId: string): Promise<Document | null> {
    return this.prismaService.document.findFirst({
      where: { id, authorId: userId },
      include: { author: true },
    });
  }

  async create(data: CreateDocumentDTO, userId: string): Promise<Document> {
    return this.prismaService.document.create({
      data: {
        title: data.title,
        content: data.content ?? '',
        authorId: userId,
      },
      include: { author: true },
    });
  }

  async update(id: string, data: UpdateDocumentDTO, userId: string): Promise<Document> {
    return this.prismaService.document.update({
      where: { id },
      data,
      include: { author: true },
    });
  }
}
