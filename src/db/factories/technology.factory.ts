import { faker } from '@faker-js/faker';
import { Technology } from '../../modules/technology/entities/technology.entity';

const technologyFactory = () => {
  const technology = new Technology();
  
  technology.name = faker.word.noun();
  
  return technology;
};

export default technologyFactory;
