import { faker } from '@faker-js/faker';
import { Tag } from '../../modules/utility/tag/entities/tag.entity';

const tagFactory = () => {
  const tag = new Tag();
  
  tag.name = faker.word.adjective();
  
  return tag;
};

export default tagFactory;
