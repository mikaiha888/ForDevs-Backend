import { setSeederFactory } from 'typeorm-extension';

import { Tag } from 'src/modules/tag/entities/tag.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Project } from 'src/modules/project/entities/project.entity';

import createTagFactory from './tag.factory';
import createUserFactory from './user.factory';
import createProjectFactory from './project.factory';

export const registerFactories = () => {
  setSeederFactory(Tag, createTagFactory);
  setSeederFactory(User, createUserFactory);
  setSeederFactory(Project, createProjectFactory);
};
