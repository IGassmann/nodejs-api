import AggregateRoot from '../../../common/domain/aggregate-root';

export default class Category extends AggregateRoot<Category> {
  public name: string;
}
