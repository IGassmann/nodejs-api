import { ObjectId } from 'mongodb';

export default abstract class Entity<T> {
  public readonly id: ObjectId = new ObjectId();

  private static isEntity(entity: any): entity is Entity<any> {
    return entity instanceof Entity;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id.equals(object.id);
  }
}
