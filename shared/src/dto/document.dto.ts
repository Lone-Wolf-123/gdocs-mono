// share/dto/document.dto.ts
import { UserDTO } from './user.dto';
import { Type, Expose } from 'class-transformer';

export class DocumentDTO {
  @Expose() id!: string;
  @Expose() title!: string;
  @Expose() content!: string;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;
  @Expose() authorId?: string;
  @Expose() @Type(() => UserDTO) author?: UserDTO;
}

export class CreateDocumentDTO {
  @Expose() title!: string;
  @Expose() content?: string;
}

export class UpdateDocumentDTO {
  @Expose() title?: string;
  @Expose() content?: string;
}
