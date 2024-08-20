import { User } from 'src/modules/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import dataSource from '../data-source';
import { Plan } from 'src/modules/plan/entities/plan.entity';

const userFactory = async () => {
  const plansRepository = dataSource.getRepository(Plan);

  const user = new User();
  const plans = await plansRepository.find({
    where: { planName: 'Free' || 'Premium' },
  });

  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.bio = faker.lorem.sentence();
  user.aboutMe = faker.lorem.paragraph();
  user.image = faker.image.avatar();
  user.coverImage = faker.image.url();
  user.plan = faker.helpers.arrayElement(plans);

  return user;
};

export default userFactory;
