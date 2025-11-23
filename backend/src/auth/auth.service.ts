import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from '@gdocs/shared/auth/register.dto.js';

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
		const user = await this.users.createUser(data);
		return this.createToken(user);
	}

	async login(email: string, password: string) {
		const user = await this.users.findByEmail(email);
		if (!user) throw new UnauthorizedException('Invalid credentials');

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) throw new UnauthorizedException('Invalid credentials');

		return this.createToken(user);
	}

	createToken(user: any) {
		return {
			access_token: this.jwt.sign({ sub: user.id, email: user.email }),
		};
	}
}
