import { Commission } from 'src/modules/commission/entities/commission.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import dataSource from '../data-source';

const commissionFactory = async () => {
  const commission = new Commission();
  const contractRepository = dataSource.getRepository(Contract);

  const contracts = await contractRepository.find({
    relations: ['receiver.plan'],
  });

  const contract = contracts[Math.floor(Math.random() * contracts.length)];
  const receiver = await contract.receiver

  commission.contract = contract;
  if (receiver.plan.name === 'Free') {
    commission.rate = 25;
  }
  if (receiver.plan.name === 'Premium') {
    commission.rate = 5;
  }
  commission.amount = (commission.rate * contract.amount) / 100;

  return commission;
};

export default commissionFactory;
