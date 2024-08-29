import { setSeederFactory } from 'typeorm-extension';
import { User } from 'src/modules/user/entities/user.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Technology } from 'src/modules/technology/entities/technology.entity';
import { Review } from 'src/modules/review/entities/review.entity';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Like } from 'src/modules/like/entities/like.entity';
import { Link } from 'src/modules/link/entities/link.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Product } from 'src/modules/product/entities/product.entity';

import projectFactory from './project.factory';
import userFactory from './user.factory';
import tagFactory from './tag.factory';
import technologyFactory from './technology.factory';
import reviewFactory from './review.factory';
import planFactory from './plan.factory';
import roleFactory from './role.factory';
import likeFactory from './like.factory';
import linkFactory from './link.factory';
import contractFactory from './contracts.factory';
// import paymentFactory from './payment.factory';
import productFactory from './product.factory';


export const registerFactories = () => {
  setSeederFactory(User, userFactory);
  setSeederFactory(Project, projectFactory);
  setSeederFactory(Tag, tagFactory);
  setSeederFactory(Technology, technologyFactory);
  setSeederFactory(Review, reviewFactory);
  setSeederFactory(Plan, planFactory);
  setSeederFactory(Role, roleFactory);
  setSeederFactory(Like, likeFactory);
  setSeederFactory(Link, linkFactory);
  setSeederFactory(Contract, contractFactory);
  // setSeederFactory(Payment, paymentFactory);
  setSeederFactory(Product, productFactory);
};
