import { LoginDTO } from '@gdocs/shared/auth/login.dto.js';
import { RegisterDTO } from '@gdocs/shared/auth/register.dto.js';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService) {}

	@Post('register')
	register(@Body() dto: RegisterDTO) {
		return this.auth.register(dto);
	}

	@Post('login')
	login(@Body() dto: LoginDTO) {
		return this.auth.login(dto.email, dto.password);
	}
}
