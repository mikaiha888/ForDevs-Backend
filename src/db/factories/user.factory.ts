import { User } from 'src/modules/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import { In } from 'typeorm';
import { hash } from 'bcrypt';
import dataSource from '../data-source';

const userFactory = async () => {
  const plansRepository = dataSource.getRepository(Plan);

  const user = new User();
  const plans = await plansRepository.find({
    where: {
      planName: In(['Free', 'Premium']),
    },
  });

  const password = faker.internet.password();  

  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.password = await hash(password, 10);
  user.bio = faker.lorem.sentence();
  user.aboutMe = faker.lorem.paragraph();
  user.image = faker.image.avatar();
  user.coverImage = faker.image.url();
  user.plan = faker.helpers.arrayElement(plans);

  return user;
};

export default userFactory;
