import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateChannelDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsMongoId()
  public readonly categoryId: ObjectId;
}
