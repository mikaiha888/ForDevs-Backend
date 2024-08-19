import { setSeederFactory } from 'typeorm-extension';
import { User } from 'src/modules/user/entities/user.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import userFactory from './user.factory';
import projectFactory from './project.factory';

export const registerFactories = () => {
  setSeederFactory(User, userFactory);
  setSeederFactory(Project, projectFactory);
};
