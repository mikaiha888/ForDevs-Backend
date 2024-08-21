import { Plan } from 'src/modules/plan/entities/plan.entity';

const planFactory = () => {
  const plan = new Plan();

  return plan;
};

export default planFactory;
