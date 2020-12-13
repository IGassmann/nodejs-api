import ValueObject from '../../../common/domain/value-object';

export default class Price extends ValueObject {
  private readonly value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  public valueOf(): number {
    return this.value;
  }
}
