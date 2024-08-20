import { Plan } from 'src/modules/plan/entities/plan.entity';
import { FactoryCallback } from 'typeorm-extension';

interface PlanMeta {
  planName?: Plan['planName'];
}

const planFactory = (faker, meta) => {
  const plan = new Plan();

  switch (meta?.planName) {
    case 'Premium':
      plan.planName = 'Premium';
      plan.price = 10.0;
      break;
    case 'Admin':
      plan.planName = 'Admin';
      plan.price = 20.0;
      break;
    default:
      plan.planName = 'Free';
      plan.price = 0.0;
      break;
  }

  return plan;
};

export default planFactory;
