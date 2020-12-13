import { IEvent, AggregateRoot as NestAggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import Entity from './entity';

export default abstract class AggregateRoot<EntityType, EventBase extends IEvent = IEvent>
  extends NestAggregateRoot
  implements Entity<EntityType> {

  public readonly id: ObjectId = new ObjectId();

  private static isEntity(entity: any): entity is Entity<any> {
    return entity instanceof Entity;
  }

  public equals(object?: Entity<EntityType>): boolean {
    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!AggregateRoot.isEntity(object)) {
      return false;
    }

    return this.id.equals(object.id);
  }
}
