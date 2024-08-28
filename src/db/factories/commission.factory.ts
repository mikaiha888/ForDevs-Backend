import { Commission } from 'src/modules/commission/entities/commission.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import dataSource from '../data-source';

const commissionFactory = async () => {
  const commission = new Commission();
  const contractRepository = dataSource.getRepository(Contract);

  const contracts = await contractRepository.find({
    relations: ['receiver.subscription.plan'],
  });

  const contract = contracts[Math.floor(Math.random() * contracts.length)];
  const receiver = contract.receiver;

  commission.contract = contract;
  console.log('COMMISSION CONTRACT:', commission);
  console.log('CONTRACT LOG:', contract);

  if (receiver?.subscription?.plan?.name) {
    if (receiver.subscription.plan.name === 'Free') {
      commission.rate = 25;
    } else if (receiver.subscription.plan.name === 'Premium') {
      commission.rate = 5;
    } else {
      console.log('Unknown plan:', receiver.subscription.plan.name);
      commission.rate = 25; 
    }
  } else {
    console.error('Receiver, subscription, or plan is null');
    commission.rate = 25; 
  }

  commission.amount = (commission.rate * contract.amount) / 100;

  return commission;
};

export default commissionFactory;

