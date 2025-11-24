import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DocsController } from './docs.controller';
import { DocsGateway } from './docs.gateway';
import { DocsService } from './docs.service';

@Module({
	controllers: [DocsController],
	providers: [DocsService, DocsGateway],
	imports: [PrismaModule],
})
export class DocsModule {}
