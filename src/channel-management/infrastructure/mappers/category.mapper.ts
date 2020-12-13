import CategoryDTO from '../../application/queries/list-categories/category.dto';
import CategoryDocument from '../documents/category.document';

export default class CategoryMapper {
  public static toDTO(categoryDocument: CategoryDocument): CategoryDTO {
    return {
      id: categoryDocument._id,
      name: categoryDocument.name,
    };
  }
}
