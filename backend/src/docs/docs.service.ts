import { Injectable } from '@nestjs/common';
import { CreateDocumentDTO, DocumentDTO, UpdateDocumentDTO } from '@gdocs/shared/document.dto.js';
import { PrismaService } from '../prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DocsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(userId: string): Promise<DocumentDTO[]> {
		const docs = await this.prismaService.document.findMany({
			where: { authorId: userId },
		});

		if (!docs || docs.length === 0) return [];

		return docs.map((d) => plainToInstance(DocumentDTO, d, { excludeExtraneousValues: true }));
	}

	async getOne(id: string, userId: string): Promise<DocumentDTO | null> {
		const doc = await this.prismaService.document.findFirst({
			where: { id, authorId: userId },
			include: { author: true },
		});

		if (!doc) return null; // controller will handle 404

		return plainToInstance(DocumentDTO, doc, {
			excludeExtraneousValues: true,
		});
	}

	async create(data: CreateDocumentDTO, userId: string): Promise<DocumentDTO> {
		const doc = await this.prismaService.document.create({
			data: {
				title: data.title,
				content: data.content ?? '',
				authorId: userId,
			},
			include: { author: true },
		});
		return plainToInstance(DocumentDTO, doc, {
			excludeExtraneousValues: true,
		});
	}

	async update(id: string, data: UpdateDocumentDTO, userId: string): Promise<DocumentDTO | null> {
		const doc = await this.prismaService.document
			.update({
				where: { id },
				data,
				include: { author: true },
			})
			.catch(() => null);

		if (!doc) return null;

		return plainToInstance(DocumentDTO, doc, {
			excludeExtraneousValues: true,
		});
	}
}
