import { setSeederFactory } from 'typeorm-extension';

import { Tag } from 'src/modules/tag/entities/tag.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Project } from 'src/modules/project/entities/project.entity';

import tagFactory from './tag.factory';
import userFactory from './user.factory';
import projectFactory from './project.factory';

export const registerFactories = () => {
  setSeederFactory(Tag, tagFactory);
  setSeederFactory(User, userFactory);
  setSeederFactory(Project, projectFactory);
};
