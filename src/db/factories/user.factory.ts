import { faker } from '@faker-js/faker';
import { User } from 'src/modules/user/entities/user.entity';

const createUserFactory = () => {
  const user = new User();
  
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName(); 
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.bio = faker.lorem.sentence();
  user.aboutMe = faker.lorem.paragraph();
  user.image = faker.image.avatar();
  user.coverImage = faker.image.imageUrl();
  
  return user;
};

export default createUserFactory;
