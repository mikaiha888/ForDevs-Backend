import { Contract } from 'src/modules/contract/entities/contract.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import dataSource from '../data-source';

const contractFactory = async () => {
  const userRepository = dataSource.getRepository(User);

  const users = await userRepository.find();

  if (users.length < 2) {
    throw new Error('At least two users are required to create contracts');
  }

  let contract: Contract;
  let isUnique = false;

  while (!isUnique) {
    const senderIndex = Math.floor(Math.random() * users.length);
    const sender = users[senderIndex];

    const remainingUsers = [...users];
    remainingUsers.splice(senderIndex, 1);

    const receiver =
      remainingUsers[Math.floor(Math.random() * remainingUsers.length)];

      contract = new Contract();
      contract.title = faker.lorem.words(3);
      contract.availableTime = faker.date.future().toISOString();
      contract.status = faker.helpers.arrayElement([
        'rejected',
        'pending',
        'accepted',
      ]);
      contract.sender = sender;
      contract.receiver = receiver;
      isUnique = true;
  }

  return contract;
};

export default contractFactory;
