import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '@gdocs/shared/user.dto.js';
import { plainToInstance } from 'class-transformer';
import { RegisterDTO } from '@gdocs/shared/auth/register.dto.js';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async findByEmail(email: string): Promise<UserDTO | null> {
		const user = await this.prisma.user.findUnique({ where: { email } });
		return plainToInstance(UserDTO, user, {
			excludeExtraneousValues: true,
		});
	}

	async findById(id: string): Promise<UserDTO | null> {
		const user = await this.prisma.user.findUnique({ where: { id } });
		return plainToInstance(UserDTO, user, {
			excludeExtraneousValues: true,
		});
	}

	async createUser(data: RegisterDTO): Promise<UserDTO> {
		const hashed = await bcrypt.hash(data.password, 10);
		const user = await this.prisma.user.create({
			data: {
				email: data.email,
				name: data.name ?? '',
				password: hashed,
			},
		});
		return plainToInstance(UserDTO, user, {
			excludeExtraneousValues: true,
		});
	}
}
