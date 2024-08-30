import { User } from 'src/modules/core/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Plan } from 'src/modules/core/plan/entities/plan.entity';
import { Role } from 'src/modules/auxiliary/role/entities/role.entity';
import { In } from 'typeorm';
import { hash } from 'bcrypt';
import dataSource from '../data-source';

const userFactory = async () => {
  const plansRepository = dataSource.getRepository(Plan);
  const rolesRepository = dataSource.getRepository(Role);

  const user = new User();

  const plans = await plansRepository.find({
    where: {
      name: In(['Free', 'Premium']),
    },
  });
  const roles = await rolesRepository.find({
    where: {
      name: In(['User', 'Admin']),
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
  user.role = faker.helpers.arrayElement(roles);
  user.plan = faker.helpers.arrayElement(plans);

  return user;
};

export default userFactory;
