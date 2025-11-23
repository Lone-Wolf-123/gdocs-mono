import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from '@gdocs/shared/auth/register.dto.js';
import { LoginDTO } from '@gdocs/shared/auth/login.dto.js';

@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService) {}

	@Post('register')
	register(@Body() body: RegisterDTO) {
		return this.auth.register(body);
	}

	@Post('login')
	login(@Body() body: LoginDTO) {
		return this.auth.login(body.email, body.password);
	}
}
