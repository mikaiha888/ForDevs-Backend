import { faker } from '@faker-js/faker';
import { User } from 'src/modules/user/entities/user.entity';
import { Project } from '../../modules/project/entities/project.entity';
import { Tag } from '../../modules/tag/entities/tag.entity';
import { Technology } from '../../modules/technology/entities/technology.entity';
import datasource from '../data-source';

const projectFactory = async () => {
  const project = new Project();

  const userRepository = datasource.getRepository(User);
  const tagRepository = datasource.getRepository(Tag);
  const technologyRepository = datasource.getRepository(Technology);

  const users = await userRepository.find();
  const user =
    users.length > 0
      ? users[Math.floor(Math.random() * users.length)]
      : await userRepository.save({ firstName: faker.internet.userName() });

  const tags = await tagRepository.find();
  const technologies = await technologyRepository.find();

  const selectedTags = tags.length > 0 ? tags.slice(0, 3) : [];
  const selectedTechnologies =
    technologies.length > 0 ? technologies.slice(0, 2) : [];

  project.title = faker.lorem.words(3);
  project.description = faker.lorem.paragraph();
  project.image = faker.image.url();
  project.user = user;
  project.tags = selectedTags;
  project.technologies = selectedTechnologies;

  return project;
};

export default projectFactory;
