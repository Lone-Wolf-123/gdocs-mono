import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// This import is solely to force the TypeScript compiler to load the necessary
// type definitions from the client's runtime library, resolving the TS2742 issue
// caused by pnpm's deep dependency paths.
import type {} from '@prisma/client/runtime/library';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	const port = process.env.PORT || 3001;

	await app.listen(port);
	console.log(`🚀 Server running on http://localhost:${port}`);
}
void bootstrap();
