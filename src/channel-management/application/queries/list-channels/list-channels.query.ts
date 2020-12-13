import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export default class ListChannelsQuery {
  @IsOptional()
  readonly after?: string;

  @IsOptional()
  readonly before?: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly limit?: number = 10;
}
