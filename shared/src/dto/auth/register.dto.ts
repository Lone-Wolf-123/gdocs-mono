import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class RegisterDTO {
	@IsEmail()
	email!: string;

	@MinLength(6)
	@IsString()
	password!: string;

	@IsOptional()
	@IsString()
	name?: string;
}
