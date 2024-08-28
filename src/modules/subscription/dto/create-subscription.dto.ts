import { User } from "src/modules/user/entities/user.entity";

export class CreateSubscriptionDto {
  id: string;
  user: User;
  status: string; 
}
