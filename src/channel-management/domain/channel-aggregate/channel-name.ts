import Result from '../../../common/domain/result';
import ValueObject from '../../../common/domain/value-object';

export default class ChannelName extends ValueObject {
  private readonly value: string;

  private constructor(value: string) {
    super();
    this.value = value;
  }

  public static create(name: string): Result<ChannelName> {
    if (name.length > 30) {
      return Result.fail<ChannelName>('Channel name is more than 30 characters.');
    }
    const channelName = new ChannelName(name);

    return Result.ok<ChannelName>(channelName);
  }

  public valueOf(): string {
    return this.value;
  }
}
