import { Plan } from 'src/modules/plan/entities/plan.entity';

const planFactory = (meta) => {
  const plan = new Plan();

  switch (meta?.planName) {
    case 'Premium':
      plan.planName = 'Premium';
      break;
    case 'Admin':
      plan.planName = 'Admin';
      break;
    default:
      plan.planName = 'Free';
      break;
  }

  return plan;
};

export default planFactory;
