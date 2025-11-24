import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
	@Expose()
	@IsEmail()
	email!: string;
	@Expose()
	@IsString()
	password!: string;
}
