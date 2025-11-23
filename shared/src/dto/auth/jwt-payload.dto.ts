import { Expose } from 'class-transformer';

export class JwtPayloadDTO {
	@Expose()
	sub!: string;

	@Expose()
	email!: string;
}
