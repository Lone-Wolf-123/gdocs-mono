import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';

@Module({
	providers: [UsersService, PrismaModule],
	exports: [UsersService],
})
export class UsersModule {}
