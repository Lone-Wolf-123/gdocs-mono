import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import { DocsGateway } from './docs.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	controllers: [DocsController],
	providers: [DocsService, DocsGateway],
	imports: [PrismaModule],
})
export class DocsModule {}
