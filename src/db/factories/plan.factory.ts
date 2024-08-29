import { Plan } from 'src/modules/core/plan/entities/plan.entity';

const planFactory = () => {
  const plan = new Plan();

  return plan;
};

export default planFactory;
