import Entity from '../../../common/domain/entity';
import Price from './price';

export default class Tier extends Entity<Tier> {
  constructor(title: string, price: Price) {
    super();
    this.title = title;
    this.price = price;
  }

  public title: string;

  public price: Price;
}
