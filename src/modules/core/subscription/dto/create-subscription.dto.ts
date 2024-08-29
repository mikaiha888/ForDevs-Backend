import { User } from "src/modules/core/user/entities/user.entity";

export class CreateSubscriptionDto {
  id: string;
  user: User;
  status: string; 
}
