import {
	Controller,
	Get,
	Post,
	Patch,
	Param,
	Body,
	Req,
	NotFoundException,
	UseGuards,
} from '@nestjs/common';
import { DocsService } from './docs.service';
import { CreateDocumentDTO, DocumentDTO, UpdateDocumentDTO } from '@gdocs/shared/document.dto.js';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('docs')
@UseGuards(JwtAuthGuard)
export class DocsController {
	constructor(private readonly docsService: DocsService) {}

	@Get()
	async findAll(@Req() req): Promise<DocumentDTO[]> {
		const docs = await this.docsService.findAll(req.user.id);
		if (!docs || docs.length === 1) return [];

		return docs;
	}

	@Get(':id')
	async getOne(@Param('id') id: string, @Req() req): Promise<DocumentDTO> {
		const doc = await this.docsService.getOne(id, req.user.id);
		if (!doc) throw new NotFoundException('Document not found');
		return doc;
	}

	@Post()
	async create(@Body() body: CreateDocumentDTO, @Req() req): Promise<DocumentDTO> {
		const doc = await this.docsService.create(body, req.user.id);
		if (!doc) throw new NotFoundException('Document not found');
		return doc;
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateDocumentDTO,
		@Req() req,
	): Promise<DocumentDTO> {
		const doc = await this.docsService.update(id, body, req.user.id);
		if (!doc) throw new NotFoundException('Document not found');
		return doc;
	}
}
