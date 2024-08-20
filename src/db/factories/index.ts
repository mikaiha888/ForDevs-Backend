import { setSeederFactory } from 'typeorm-extension';

import { User } from 'src/modules/user/entities/user.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Technology } from 'src/modules/technology/entities/technology.entity';
import { Review } from 'src/modules/review/entities/review.entity';

import userFactory from './user.factory';
import projectFactory from './project.factory';
import tagFactory from './tag.factory';
import technologyFactory from './technology.factory';
import reviewFactory from './review.factory';

export const registerFactories = () => {
  // Registrar las fábricas
  setSeederFactory(User, userFactory);
  setSeederFactory(Project, projectFactory);
  setSeederFactory(Tag, tagFactory);
  setSeederFactory(Technology, technologyFactory);
  setSeederFactory(Review, reviewFactory);
};
