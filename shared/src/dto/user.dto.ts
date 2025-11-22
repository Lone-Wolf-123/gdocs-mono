// share/dto/user.dto.ts
import { Expose } from 'class-transformer';

export class UserDTO {
  @Expose() id!: string; //     @id @default(cuid())
  @Expose() email!: string; //   @unique
  @Expose() name!: string; //
  password!: string; //   // If you do email+password login
  @Expose() provider!: string; //   // If OAuth (e.g., "google")
  @Expose() providerId!: string; //   // OAuth provider UID
  @Expose() createdAt!: Date; // @default(now())
  @Expose() updatedAt!: Date; //@updatedAt
}
