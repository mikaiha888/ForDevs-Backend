import { faker } from '@faker-js/faker';
import { Technology } from '../../modules/auxiliary/technology/entities/technology.entity';

const technologyFactory = () => {
  const technology = new Technology();
  
  technology.name = faker.word.noun();
  
  return technology;
};

export default technologyFactory;
