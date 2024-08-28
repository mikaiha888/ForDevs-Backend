import dataSource from '../data-source';
import { Product } from 'src/modules/product/entities/product.entity';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';

const productFactory = async (): Promise<Product> => {
  const planRepository = dataSource.getRepository(Plan);
  const contractRepository = dataSource.getRepository(Contract);

  const plans = await planRepository.find();
  const contracts = await contractRepository.find();

  if (plans.length === 0 || contracts.length === 0) {
    throw new Error('No plans or contracts found during product creation');
  }

  const plan = plans[Math.floor(Math.random() * plans.length)];
  const contract = contracts[Math.floor(Math.random() * contracts.length)];

  const product = new Product();
  product.amount = plan.amount;
  product.currency = plan.currency;
  product.description = plan.description;

  return product;
};

export default productFactory;
