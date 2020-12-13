import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export default class UpdateChannelBrandingDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUUID()
  readonly icon: string;
}
