import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
	@Expose() @IsEmail() email!: string;
	@Expose() @MinLength(6) @IsString() password!: string;
	@Expose() @IsOptional() @IsString() name?: string;
}
