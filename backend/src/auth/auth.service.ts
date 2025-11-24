import { RegisterDTO } from '@gdocs/shared/auth/register.dto.js';
import { UserDTO } from '@gdocs/shared/user.dto.js';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private users: UsersService,
		private jwt: JwtService,
	) {}

	async register(data: RegisterDTO) {
		const existing = await this.users.findByEmail(data.email);
		if (existing) {
			throw new UnauthorizedException('Email already exists');
		}
		/*		here sending raw password to user.service.ts
		which is not good design but for now I'm keeping it		 */
		const user = await this.users.createUser(data);
		return this.createToken(user);
	}

	async login(email: string, rawPassword: string) {
		const user = await this.users.findByEmail(email);
		if (!user) throw new UnauthorizedException('Invalid credentials');

		const valid = await bcrypt.compare(rawPassword, user.password);
		if (!valid)
			throw new UnauthorizedException('Invalid credentials');

		return this.createToken(user);
	}

	createToken(user: UserDTO) {
		return {
			access_token: this.jwt.sign({
				sub: user.id,
				email: user.email,
			}),
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		};
	}
}
