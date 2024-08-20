import { Commission } from 'src/modules/commission/entities/commission.entity';
import { faker } from '@faker-js/faker';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import dataSource from '../data-source';
import { User } from 'src/modules/user/entities/user.entity';

const commissionFactory = async () => {
  const commission = new Commission();
  const contractRepository = dataSource.getRepository(Contract);
  const userRepository = dataSource.getRepository(User)

  const contracts = await contractRepository.find();

  const contract = contracts[Math.floor(Math.random() * contracts.length)];

  const receiver = await userRepository.findOneBy({ id: contract.receiver.id })

  commission.contract = contract;
  if (receiver.plan.planName === 'Free') {
    commission.rate = faker.number.int(25);
  }
  if (receiver.plan.planName === 'Premium') {
    commission.rate = faker.number.int(5);
  }
  commission.amount = (commission.rate * contract.budget) / 100;

  return commission;
};

export default commissionFactory;
