import * as uuid from 'uuid';
import Result from '../../../common/domain/result';
import ValueObject from '../../../common/domain/value-object';

export default class ChannelIcon extends ValueObject {
  private readonly value: string;

  private constructor(value: string) {
    super();
    this.value = value;
  }

  public static create(icon: string): Result<ChannelIcon> {
    if (!uuid.validate(icon)) {
      return Result.fail<ChannelIcon>('Channel icon is not a valid UUID');
    }
    const channelIcon = new ChannelIcon(icon);

    return Result.ok<ChannelIcon>(channelIcon);
  }

  public valueOf(): string {
    return this.value;
  }
}
