import { classToPlain, plainToClass } from 'class-transformer';
import TierEmbeddedDTO from '../../application/queries/list-channels/tier.embedded-dto';
import Price from '../../domain/channel-aggregate/price';
import Tier from '../../domain/channel-aggregate/tier';
import TierEmbeddedDocument from '../documents/tier.embedded-document';

export default class TierMapper {
  public static toDomain(tierDocument: TierEmbeddedDocument): Tier {
    const plainTier = {
      id: tierDocument._id,
      title: tierDocument.title,
      price: new Price(tierDocument.price),
    };
    return plainToClass(Tier, plainTier);
  }

  public static toDocument(tier: Tier): TierEmbeddedDocument {
    const plainTier = classToPlain(tier);
    return {
      _id: plainTier.id,
      title: plainTier.title,
      price: plainTier.price.value,
    };
  }

  public static toDTO(tierDocument: TierEmbeddedDocument): TierEmbeddedDTO {
    return {
      id: tierDocument._id,
      title: tierDocument.title,
      price: tierDocument.price,
    };
  }
}
