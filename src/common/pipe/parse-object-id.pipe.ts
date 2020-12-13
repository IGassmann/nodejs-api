import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectID, ObjectId } from 'mongodb';

/**
 * Defines the pipe for MongoDB ObjectID validation and transformation
 */
@Injectable()
export default class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
  /**
   * Validates and transforms a value to a MongoDB ObjectID
   *
   * @remarks
   * Throws a ArgumentException if the validation fails
   *
   * @param value - The value to validate and transform
   * @returns The MongoDB ObjectID
   */
  public transform(value: any): ObjectID {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('ObjectId is invalid');
    }
    return ObjectId.createFromHexString(value);
  }
}
