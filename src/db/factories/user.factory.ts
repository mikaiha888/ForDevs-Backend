import { User } from 'src/modules/user/entities/user.entity';
import { faker } from '@faker-js/faker';

const userFactory = (): User => {
  const user = new User();

  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password(); 
  user.bio = faker.lorem.sentence();
  user.aboutMe = faker.lorem.paragraph();
  user.image = faker.image.avatar();
  user.coverImage = faker.image.url();
  
  return user;
};

export default userFactory
