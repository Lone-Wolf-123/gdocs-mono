import { JwtPayloadDTO } from '@gdocs/shared/auth/jwt-payload.dto.js';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private users: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET || 'dev-secret',
		});
	}

	async validate(payload: JwtPayloadDTO) {
		return this.users.findById(payload.sub); // becomes req.user
	}
}
