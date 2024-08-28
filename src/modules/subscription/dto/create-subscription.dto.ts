import { Plan } from "src/modules/plan/entities/plan.entity";
import { User } from "src/modules/user/entities/user.entity";

export class CreateSubscriptionDto {
  id: string;
  user: User;
  plan: Plan;
}
