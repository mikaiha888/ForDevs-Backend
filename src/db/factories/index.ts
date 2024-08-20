import { setSeederFactory } from 'typeorm-extension';
import { User } from 'src/modules/user/entities/user.entity';
import { userFactory } from './user.factory';
import { Project } from 'src/modules/project/entities/project.entity';
import projectFactory from './project.factory';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import tagFactory from './tag.factory';

export const registerFactories = () => {
  // Registrar las fábricas
  setSeederFactory(User, userFactory);
  setSeederFactory(Project, projectFactory);
  setSeederFactory(Tag, tagFactory);
};
