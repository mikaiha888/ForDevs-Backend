import { Link } from 'src/modules/link/entities/link.entity';
import { User } from 'src/modules/user/entities/user.entity';
import dataSource from '../data-source';
import { faker } from '@faker-js/faker';

const linkFactory=  async () => {
  const link = new Link();

  const userRepository = dataSource.getRepository(User);
  
  const users = await userRepository.find();

  if (users.length === 0) {
    throw new Error('No users found. Please seed users first.');
  }

  link.user = users[Math.floor(Math.random() * users.length)];
  link.userId = link.user.id;
  
  link.name = faker.internet.domainWord();
  link.url = faker.internet.url();

  return link;
};

export default linkFactory;
